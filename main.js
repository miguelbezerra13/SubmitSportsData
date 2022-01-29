// Declare the variables
const activityForm = document.querySelector('#activity-form');
const activities = document.getElementsByName('activity')
const dateString = document.querySelector('#date')
const distance = document.querySelector('#distance')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const calories = document.querySelector('#calories')
const elevation = document.querySelector('#elevation')

activityForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    
    e.preventDefault();

    // Get the selected radio button
    let activity

    for (i=0; i < activities.length; i++) {
        if(activities[i].checked)
        activity = activities[i]
    };

    // Format the date
    const date = new Date(dateString.value).toLocaleDateString("en-US")

    console.log(activity.value)
    console.log(date)
    console.log(distance.value)
    console.log(hours.value)
    console.log(minutes.value)
    console.log(seconds.value)
    console.log(calories.value)
    console.log(elevation.value)

}