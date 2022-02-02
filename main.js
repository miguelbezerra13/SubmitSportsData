// Declare the variables
const activityForm = document.querySelector('#activity-form');
const activities = document.getElementsByName('activity');
const dateString = document.querySelector('#date');
const distance = document.querySelector('#distance');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const calories = document.querySelector('#calories');
const elevation = document.querySelector('#elevation');

activityForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    
    e.preventDefault();

    // Get the selected radio button
    let activity;

    for (i=0; i < activities.length; i++) {
        if(activities[i].checked)
        activity = activities[i]
    };

    // Format the date
    const date = new Date(dateString.value).toLocaleDateString("en-US");

    // Create the structure of the JSON and add the corresponding values
    const actLog = {
        "activityType": activity.value,
        "activityDate": date,
        "activityDistance": distance.value,
        "activityHours": hours.value,
        "activityMinutes": minutes.value,
        "activitySeconds": seconds.value,
        "activityCalories": calories.value,
        "activityElevation": elevation.value
    };

    // Send the data to the API
    fetch('http://localhost:8000/post', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(actLog),
    })

    // The only thing missing would be a sign in the web page that the data was correctly sent

};