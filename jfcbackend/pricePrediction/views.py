from django.shortcuts import render
from .models import HousePrice
from django.core.paginator import Paginator
from django.db.models import Q
from django.contrib import messages  
import sqlite3
from .utils import get_plot
import requests

#For price prediction
#Need to pip install pandas 
#Need to pip install django-numpy and put in installed apps django_numpy 
#Need to pip install seaborn 
#Need to pip install tensorflow 
#Need to pip install django-matplotlib
import pandas as pd 
import numpy as np 
import seaborn as sns 
import matplotlib.pyplot as plt
import tensorflow as tf 
import os 
from tensorflow.keras.models import Sequential 
from tensorflow.keras.layers import * 
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras.losses import MeanSquaredError 
from tensorflow.keras.metrics import RootMeanSquaredError
from tensorflow.keras.optimizers import Adam 
from sklearn.preprocessing import StandardScaler 

import itertools

# for favourites
from django.shortcuts import get_object_or_404

# Create your views here.

# Creating a function to return a list of all possible permutations of town, flat_type, flat_model
def get_all_combinations():
    # Removed 'ANG MO KIO' as updated dataset already
    # On hold 'BEDOK' got error, to be precise, BEDOK, 2 ROOM, Model A, error at line 142
    # On hold 'BISHAN' got error, to be precise, BISHAN, 4 ROOM, Improved, error at only 3 predicted prices came out, line 157
    town = ['ANG MO KIO', 'BEDOK', 'BISHAN' ,'BUKIT BATOK', 'BUKIT MERAH', 'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG', 'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST', 'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL', 'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES', 'TOA PAYOH', 'WOODLANDS', 'YISHUN']
    flat_type = ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE', '1 ROOM', 'MULTI-GENERATION']
    flat_model = ['Improved', 'New Generation', 'DBSS', 'Standard', 'Apartment', 'Simplified', 'Model A', 'Premium Apartment', 'Adjoined flat', 'Model A-Maisonette', 'Maisonette', 'Type S1', 'Type S2', 'Model A2', 'Terrace', 'Improved-Maisonette', 'Premium Maisonette', 'Multi Generation', 'Premium Apartment Loft', '2-room', '3Gen']
    all_variables = [ town, flat_type, flat_model ]
    all_combinations = list(itertools.product (*all_variables))
    return all_combinations

def updating_future_data():
    all_combinations = get_all_combinations()
    for combination in all_combinations:
        print(combination)
        if HousePrice.objects.filter(town=combination[0], flat_type=combination[1], flat_model=combination[2]).exists():

            #print(HousePrice.objects.filter(town=combination[0], flat_type=combination[1], flat_model=combination[2]).all())

            future_prices = prediction_return_prices(combination[0], combination[1], combination[2])
            HousePrice.objects.filter(town=combination[0], flat_type=combination[1], flat_model=combination[2]).update(
                resale_price_aft1year = future_prices[0],
                resale_price_aft2year = future_prices[1],
                resale_price_aft3year = future_prices[2],
                resale_price_aft4year = future_prices[3],
                resale_price_aft5year = future_prices[4])
    print('updated')

# Price Prediction View According to Alphabetic Order
def all_house_price(request):

    #Filter for that certain town 
    if ('q' in request.GET) & ('ft' in request.GET) & ('fm' in request.GET): 
        q=request.GET['q']
        ft=request.GET['ft']
        fm=request.GET['fm']
        house_list = HousePrice.objects.filter(Q(town__icontains = q) & Q(flat_type__icontains=ft) & Q(flat_model__icontains = fm))
        house_paginator = Paginator(house_list, 100)
        page_num = request.GET.get('page')
        page = house_paginator.get_page(page_num)
        graph = prediction(q,ft,fm)

        # for house in page.object_list:
        #     house = get_object_or_404(HousePrice, id=house.id)
        #     print("house fav list: ", house.favourites)
        #     if house.favourites.filter(id=request.user.id).exists():
        #         print("exists")
        #         fav = True 

        context = {
            'count': house_paginator.count,
            'graph': graph,
            'page': page
            }
        return render(request,'all_house_price.html', context)
    
    else:
        #Display for all houses
        house_list = HousePrice.objects.all()

        house_paginator = Paginator(house_list, 100)

        page_num = request.GET.get('page')

        page = house_paginator.get_page(page_num)


        # for house in page.object_list:
        #     house = get_object_or_404(HousePrice, id=house.id)
        #     if house.id == 2:
        #         print("request user: ", request.user.id)
        #         print("house fav list: ", house.favourites)
        #     if house.favourites.filter(id=request.user.id).exists():
        #         fav = True 

        context = {
            'count': house_paginator.count,
            'page': page,
            }
        return render(request, 'all_house_price.html', context)

def prediction_return_prices(town_name, type_of_flat, model_of_flat):
    con = sqlite3.connect("db.sqlite3")
    df = pd.read_sql_query("SELECT * from pricePrediction_houseprice", con)
    #Change the format of dates 
    df['year'] = pd.DatetimeIndex(df['month']).year
    df['month'] = pd.DatetimeIndex(df['month']).month
    #Data cleaning, drop unnecessary columns not used in prediction 
    x = df.drop(['month','block','street_name','storey_range','remaining_lease'], axis=1)
    #Reorder the columns such that resale price is first 
    x = x[['resale_price', 'year','floor_area_sqm', 'lease_commence_date', 'town', 'flat_type', 'flat_model']]
    #One hot encoding for categorical variables 
    x = pd.get_dummies(x, columns=['town','flat_type','flat_model'])
    #Filtering only rows that meet selection criteria 
    town_header = "town_"
    town_header += town_name
    type_header = "flat_type_"
    type_header += type_of_flat
    model_header = "flat_model_"
    model_header += model_of_flat
    row = x[(x[town_header] == 1) & (x[type_header] == 1) & (x[model_header] == 1)  ].to_numpy()
    print("row:", row)

    #Scale these rows to prepare for training and prediction
    scaler = StandardScaler() 
    scaler = scaler.fit(row)
    row_scaled = scaler.transform(row)
    #Preparing train and test set 
    train_x = []
    train_y = [] 
    
    # number of future years we want to predict prices for 
    future_years = 5
    # number of past years we want to use for price prediction 
    past_years = 5 
    
    for i in range (past_years, len(row_scaled) - future_years+1): 
        train_x.append(row_scaled[i - past_years:i, 0:row.shape[1]])
        train_y.append(row_scaled[i + future_years-1: i + future_years, 0])
        
    train_x, train_y = np.array(train_x), np.array(train_y)
    
    #The LSTM model 
    model = Sequential() 
    # return_sequences = True means you want the current LSTM to produce a sequence for the next LSTM to input 
    model.add(LSTM(64, activation='relu', input_shape=(train_x.shape[1], train_x.shape[2]),return_sequences=True))
    model.add(LSTM(32, activation='relu', return_sequences=False ))
    model.add(Dropout(0.4))
    model.add(Dense(train_y.shape[1]))
    model.compile(optimizer='adam', loss='mse')

    #Training the LSTM Model 
    history = model.fit(train_x, train_y, epochs=50, batch_size=16, validation_split=0.1, verbose=1)
    
    #Years we want to predict for: forecast_dates = np.array([2024,2025,2026,2027,2028])
    #Make prediction
    prediction = model.predict(train_x[0:future_years]) #shape = (n, 1) where n is the n_days_for_prediction
    prediction_copies = np.repeat(prediction, x.shape[1], axis=-1)
    #Values were scaled, so must inverse to obtain the actual price predictions 
    y_pred_future = scaler.inverse_transform(prediction_copies)[:,0]
    print("Predicted prices:", y_pred_future)
    con.close()
    #Return the predicted prices
    return y_pred_future


#Price prediction display function 
def prediction(town_name,type_of_flat,model_of_flat):
    con = sqlite3.connect("db.sqlite3")
    df = pd.read_sql_query("SELECT * from pricePrediction_houseprice", con)
    #Change the format of dates 
    df['year'] = pd.DatetimeIndex(df['month']).year
    df['month'] = pd.DatetimeIndex(df['month']).month
    #Data cleaning, drop unnecessary columns not used in prediction 
    x = df.drop(['month','block','street_name','storey_range','remaining_lease'], axis=1)
    #Reorder the columns such that resale price is first 
    x = x[['resale_price', 'year','floor_area_sqm', 'lease_commence_date', 'town', 'flat_type', 'flat_model']]
    #One hot encoding for categorical variables 
    x = pd.get_dummies(x, columns=['town','flat_type','flat_model'])
    #Filtering only rows that meet selection criteria 
    town_header = "town_"
    town_header += town_name
    type_header = "flat_type_"
    type_header += type_of_flat
    model_header = "flat_model_"
    model_header += model_of_flat
    row = x[(x[town_header] == 1) & (x[type_header] == 1) & (x[model_header] == 1)  ].to_numpy()
    print(row)
    #Scale these rows to prepare for training and prediction
    scaler = StandardScaler() 
    scaler = scaler.fit(row)
    row_scaled = scaler.transform(row)
    #Preparing train and test set 
    train_x = []
    train_y = [] 
    
    # number of future years we want to predict prices for 
    future_years = 5
    # number of past years we want to use for price prediction 
    past_years = 5 
    
    for i in range (past_years, len(row_scaled) - future_years+1): 
        train_x.append(row_scaled[i - past_years:i, 0:row.shape[1]])
        train_y.append(row_scaled[i + future_years-1: i + future_years, 0])
        
    train_x, train_y = np.array(train_x), np.array(train_y)
    
    #The LSTM model 
    model = Sequential() 
    # return_sequences = True means you want the current LSTM to produce a sequence for the next LSTM to input 
    model.add(LSTM(64, activation='relu', input_shape=(train_x.shape[1], train_x.shape[2]),return_sequences=True))
    model.add(LSTM(32, activation='relu', return_sequences=False ))
    model.add(Dropout(0.4))
    model.add(Dense(train_y.shape[1]))
    model.compile(optimizer='adam', loss='mse')

    #Training the LSTM Model 
    history = model.fit(train_x, train_y, epochs=50, batch_size=16, validation_split=0.1, verbose=1)
    
    #Years we want to predict for 
    forecast_dates = np.array([2024,2025,2026,2027,2028])
    #Make prediction
    prediction = model.predict(train_x[0:future_years]) #shape = (n, 1) where n is the n_days_for_prediction
    prediction_copies = np.repeat(prediction, x.shape[1], axis=-1)
    #Values were scaled, so must inverse to obtain the actual price predictions 
    y_pred_future = scaler.inverse_transform(prediction_copies)[:,0]
    df_forecast = pd.DataFrame({'Date': forecast_dates, 'Price': y_pred_future})
    print(df_forecast)
    #sns.lineplot(x=df_forecast["Date"], y=df_forecast["Price"])
    x_axis = df_forecast["Date"]
    y_axis = df_forecast["Price"]
    graph = get_plot(x_axis,y_axis)
    #graph = sns.lineplot(x=df_forecast["Date"], y=df_forecast["Price"])
    con.close()
    return graph 


    


            