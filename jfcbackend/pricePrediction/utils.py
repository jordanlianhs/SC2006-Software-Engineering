import matplotlib.pyplot as plt 
import base64 
from io import BytesIO

def get_graph(): 
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close() 
    return graph 

def get_plot(x,y): 
    plt.switch_backend('AGG')
    #plt.figure(fig_size=(10,5))
    plt.title("Price Prediction for Next 5 Years")
    plt.plot(x,y)
    plt.xlabel("Years")
    plt.ylabel("Predicted Price")
    graph = get_graph()
    return graph 