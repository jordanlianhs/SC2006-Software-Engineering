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

# Create your views here.


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

    context = {
        'count': house_paginator.count,
        'page': page
        }
    return render(request, 'all_house_price.html', context)


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
    return graph 


    


            