import numpy as np
import pandas as pd
import datetime as dt
from flask import Flask,jsonify
import sqlite3

app = Flask(__name__)
conn = sqlite3.connect("Resources/hawaii.sqlite")

@app.route("/")
def home():
    return {
        f"Welcome to the Climate API</br>"
        f"Available Routes:</br>"
        f"/api/v1.0/precipitation</br>"
        f"/api/v1.0/station</br>"
        f"/api/v1.0/tobs</br>"
        f"/api/v1.0/<start></br>"
        f"/api/v1.0/<start>/<end></br>"
    }

@app.route("/api/v1.0/precipitation")
def precipitation():
    querydf = pd.read_sql_query("Select date,prcp from measurement",conn)
    datelist=[]
    querydf = querydf.dropna()
    querydf = querydf.reset_index()
    for thing in querydf["date"]:
        adate = dt.datetime.strptime(thing, "%Y-%m-%d").date()
        datelist.append(adate)
    querydf["date"]=datelist
    prcpdict = {}
    for item in np.arange(0,len(querydf["date"]),1):
        prcpdict[querydf["date"]]=querydf["prcp"]



if __name__ == "__main__":
    app.run(debug=True)