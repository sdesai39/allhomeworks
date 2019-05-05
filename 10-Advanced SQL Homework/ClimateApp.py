import numpy as np
import pandas as pd
import datetime as dt
from flask import Flask,jsonify
import sqlite3

app = Flask(__name__)

@app.route("/")
def home():
    return (
        f"Welcome to the Climate API</br>"
        f"Available Routes:</br>"
        f"/api/v1.0/precipitation</br>"
        f"/api/v1.0/station</br>"
        f"/api/v1.0/tobs</br>"
        f"/api/v1.0/start</br>"
        f"/api/v1.0/start/end"
    )

@app.route("/api/v1.0/precipitation")
def precipitation():
    conn = sqlite3.connect("hawaii.sqlite")
    cur = conn.cursor()
    cur.execute("Select date,prcp from measurement")
    rows = cur.fetchall()
    prcpdict={}
    for row in rows:
        prcpdict[row[0]] = row[1]
    return jsonify(prcpdict)



if __name__ == "__main__":
    app.run(debug=True)