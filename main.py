from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

from datetime import datetime as dt

import pandas as pd

app = FastAPI()

origins = ["http://localhost", "http://localhost:5500"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

# Expected JSON format to be received from front
class ActivityLog(BaseModel):
    activityType: str
    activityDate: str
    activityDistance: float 
    activityHours: int
    activityMinutes: int
    activitySeconds: int
    activityCalories: Optional[str] = None
    activityElevation: Optional[str] = None

@app.post("/post")
def post_activity_log(activity_log: ActivityLog):
    
    # Transform the date into a datetime to extract the year and month
    log_date = dt.strptime(activity_log.activityDate, '%m/%d/%Y')

    log_year = log_date.year
    log_month = log_date.month

    # Convert the activity duration inputs into hours
    time_h = activity_log.activityHours + (activity_log.activityMinutes/60) + (activity_log.activitySeconds/3600)
    
    # Calculate the average speed
    avg_speed = activity_log.activityDistance / time_h

    # Preparing the data t%Y-%m-%do add to the csv
    # Get the last index of the dataset
    last_csv_idx = (pd.read_csv('rwc.csv', usecols=[0], index_col=0).index)[-1]+1

    # Make a dictionary to create a dataframe
    line = {
        "index": [last_csv_idx],
        "Date": [activity_log.activityDate],
        "Type": [activity_log.activityType],
        "Distance_km": [activity_log.activityDistance],
        "Hours": [activity_log.activityHours],
        "Minutes": [activity_log.activityMinutes],
        "Seconds": [activity_log.activitySeconds],
        "Time_h": [time_h],
        "Calories": [activity_log.activityCalories],
        "ElevGain_m": [activity_log.activityElevation],
        "AvgSpeed_km/h": [avg_speed],
        "Year": [log_year],
        "Month": [log_month]
    }

    # Create the dataframe and set the index
    activity_line = pd.DataFrame(line).set_index('index')

    # Add the log to the end of the dataset
    activity_line.to_csv('rwc.csv', mode='a', header=False)