import "./reset.css";
import "./style.css";
import { getInfoCard } from "./get-info-card";
import { displayTab } from "./display-tab";
import dayjs from "dayjs";

let current = document.querySelector('.current');
current.classList.add('on-this-tab');
displayTab('current');
addEventListenerCurrent();

export function createInputDiv(tab) {
    let inputDiv = document.createElement('div');
    inputDiv.className = 'input-div';
        let locationInput = document.createElement('input');
        locationInput.type = 'text';
        locationInput.className = 'location-input';
        if (tab == 'hourly') {
            let dateInput = document.createElement('input');
            dateInput.className = 'date-input'
            dateInput.type = 'date';
            let today = dayjs().format('YYYY-MM-DD');
            dateInput.value = today;
            let rawMaxDate = dayjs().add(14, 'day');
            let maxDate = dayjs(rawMaxDate).format('YYYY-MM-DD');
            dateInput.setAttribute('max', maxDate);
            inputDiv.appendChild(dateInput);
        } else if (tab == 'daily') {
            let todayDateRaw = dayjs();
            let fifteenDaysLaterRaw = todayDateRaw.add(10, 'day');
            let todayDate = todayDateRaw.format('YYYY-MM-DD');
            let fifteenDaysLater = fifteenDaysLaterRaw.format('YYYY-MM-DD');
            let fromDiv = document.createElement('div');
            fromDiv.className = 'date-input-div'
                let fromLabel = document.createElement('label');
                fromLabel.textContent = 'From: '
                fromLabel.for = 'from';
                let fromInput = document.createElement('input');
                fromInput.type = 'date';
                fromInput.id = 'from';
                fromInput.className = 'date-input';
                fromInput.value = todayDate;
                fromDiv.appendChild(fromLabel);
                fromDiv.appendChild(fromInput);
                
                let toDiv = document.createElement('div');
                toDiv.className = 'date-input-div'
                let toLabel = document.createElement('label');
                toLabel.textContent = 'To: '
                toLabel.for = 'to';
                let toInput = document.createElement('input');
                toInput.type = 'date';
                toInput.id = 'to';
                toInput.className = 'date-input';
                toInput.value = fifteenDaysLater;
            toDiv.appendChild(toLabel);
            toDiv.appendChild(toInput);

            inputDiv.appendChild(fromDiv);
            inputDiv.appendChild(toDiv);
        } 
        let search = document.createElement('button');
        search.textContent = 'search';
        search.className = 'search';
    inputDiv.appendChild(locationInput);
    inputDiv.appendChild(search);
    return inputDiv;
}

function addEventListenerCurrent() {
    let search = document.querySelector('.search');
    search.addEventListener('click', () => {
        let searchInput = document.querySelector('.location-input');
        let value = searchInput.value;
        clearPreviousResult();
        doTheRestCurrent(value);
    })
}

function addEventListenerHourly() {
    let search = document.querySelector('.search');
    let date = document.querySelector('.date-input');
    let todayDate = dayjs();
    let maxDate = todayDate.add(14, 'day');
    search.addEventListener('click', () => {
        let locationInput = document.querySelector('.location-input');
        let location = locationInput.value;
        let dateInput = document.querySelector('.date-input');
        let date = dateInput.value;
        clearPreviousResult();
        if ((date == '') || (location == null) || (location.trim() == '')) {
            let searchResultDiv = document.querySelector('.search-result');
            let error = 'Invalid input';
            let errorDiv = document.createElement('div');
            errorDiv.className = 'error-div';
            errorDiv.textContent = error;
            searchResultDiv.appendChild(errorDiv);
        } else {
            console.log(location, date);
            doTheRestHourly(location, date);
        }
    })
    
    date.addEventListener('input', () => {
        let dateElement = document.querySelector('.date-input');
        let inputDate = dateElement.value;
        inputDate = dayjs(inputDate);
        if (inputDate.isAfter(maxDate)) {
            console.log('input date greater than max date');
            dateElement.value = maxDate.format('YYYY-MM-DD');
        }
    })
}

function addEventListenerDaily() {
    let search = document.querySelector('.search');
    let fromDateInput = document.querySelector('#from');
    let toDateInput = document.querySelector('#to');
    search.addEventListener('click', () => {
        let locationInput = document.querySelector('.location-input');
        let location = locationInput.value;
        let fromDateInput = document.querySelector('#from');
        let fromDate = fromDateInput.value;
        let toDateInput = document.querySelector('#to');
        let toDate = toDateInput.value;
        console.log(location, fromDate, toDate);
        clearPreviousResult();
        if ((location.trim() == '') || (fromDate == '') || (toDate == '')) {
            let searchResultDiv= document.querySelector('.search-result');
            searchResultDiv.textContent = 'Invalid Input';
        } else {
            doTheRestDaily(location, fromDate, toDate);
        }
    })
    fromDateInput.addEventListener('input', () => {
        let dayjsFromDate = dayjs(fromDateInput.value);
        let dayjsToDate = dayjs(toDateInput.value);
        if (fromDateInput.value == '') {
            let todayDateRaw = dayjs();
            fromDateInput.value = todayDateRaw.format('YYYY-MM-DD');
        } else if (dayjsFromDate.isAfter(dayjsToDate)) {
            fromDateInput.value = toDateInput.value;
        }
    })
    
    toDateInput.addEventListener('input', () => {
        let dayjsFromDate = dayjs(fromDateInput.value);
        let dayjsToDate = dayjs(toDateInput.value);
        if (toDateInput.value == '') {
            let todayDateRaw = dayjs();
            let maxDateRaw = todayDateRaw.add(10, 'day')
            toDateInput.value = maxDateRaw.format('YYYY-MM-DD');
        } else if (dayjsFromDate.isAfter(dayjsToDate)) {
            toDateInput.value = fromDateInput.value;
        }
    })

}

let tabButtons = document.querySelectorAll('.tab');
tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
        if (!tab.classList.contains('on-this-tab')) {
            let tabToRemove = document.querySelector('.on-this-tab');
            tabToRemove.classList.remove('on-this-tab');
            tab.classList.add('on-this-tab');
            let tabContent = document.querySelector('.tab-content');
            tabContent.innerHTML = '';
            if (tab.classList.contains('current')) {
                displayTab('current');
                addEventListenerCurrent();
            }
            else if (tab.classList.contains('hourly')) {
                displayTab('hourly');
                addEventListenerHourly();
            }
            else {
                displayTab('daily');
                addEventListenerDaily();
            }
        }
    })
})


function clearPreviousResult() {
    let locationDiv = document.querySelector('.location');
    locationDiv.innerHTML = ''
    let searchResultDiv = document.querySelector('.search-result');
    searchResultDiv.innerHTML = ''
}

async function doTheRestHourly(location, date) {
    let json = await getHourlyJson(location, date);
    console.log(json);
    let locationToDisplay = document.querySelector('.location');
    locationToDisplay.textContent = json.resolvedAddress;
    for (let i = 0; i < 24; i++) {
        let infoCard = getInfoCard();
        let finalInfoCard = insertValuesInCard(infoCard, json, i, 'hourly');
        let searchResultDiv = document.querySelector('.search-result');
        searchResultDiv.appendChild(finalInfoCard);
    }
}

async function doTheRestCurrent(inputLocation) {
    let json = await getCurrentJson(inputLocation);
    let location = document.querySelector('.location');
    location.textContent = json.resolvedAddress;
    console.log(json.resolvedAddress);
    let infoCard = getInfoCard();
    let finalInfoCard = insertValuesInCard(infoCard, json, null, 'current');
    let searchResultDiv = document.querySelector('.search-result');
    searchResultDiv.appendChild(finalInfoCard);
}

async function doTheRestDaily(location, fromDate, toDate) {
    let json = await getDailyJson(location, fromDate, toDate);
    console.log(json);
    let locationToDisplay = document.querySelector('.location');
    locationToDisplay.textContent = json.resolvedAddress;
    let numOfDays = json.days.length;
    for (let i = 0; i < numOfDays; i++) {
        let infoCard = getInfoCard();
        let finalInfoCard = insertValuesInCard(infoCard, json, i, 'daily');
        let searchResultDiv = document.querySelector('.search-result');
        searchResultDiv.appendChild(finalInfoCard);
    }

}

function insertValuesInCard(infoCard, json, i, tab) {
    if (tab == 'current') {
        json = json.currentConditions
        console.log(json)
    } else if (tab == 'hourly') {
        json = json.days[0].hours[i];
    } else if (tab == 'daily') {
        json = json.days[i];
    }
    let time = infoCard.querySelector('.time');
    time.textContent = json.datetime;
    let iconImg = infoCard.querySelector('.icon>.icon-file');
    let imagePath = require(`./imgs/${json.icon}.png`);
    iconImg.style.backgroundImage = `url(${imagePath})`;
    let condition = infoCard.querySelector('.condition');
    condition.textContent = json.conditions;
    let temp = infoCard.querySelector('.temp>.info-value');
    temp.textContent = json.temp;
    let precip = infoCard.querySelector('.precip>.info-value');
    precip.textContent = json.precip;
    let cloudCover = infoCard.querySelector('.cloud-cover>.info-value');
    cloudCover.textContent = json.cloudcover;
    let windSpeed = infoCard.querySelector('.wind-speed>.info-value');
    windSpeed.textContent = json.windspeed;
    let visibility = infoCard.querySelector('.visibility>.info-value');
    visibility.textContent = json.visibility;
    let uvIndex = infoCard.querySelector('.uv-index>.info-value');
    uvIndex.textContent = json.uvindex;

    return infoCard;
}

async function getCurrentJson(inputLocation) {
    let fetchResult = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputLocation}/today?unitGroup=metric&include=current&key=CPDRKTZAL4B8C8GGBDKP2DCMA&contentType=json`)
    let json = await fetchResult.json();
    return json;
}

async function getHourlyJson(location, date) {
    let fetchResult = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/${date}?unitGroup=metric&include=hours&key=CPDRKTZAL4B8C8GGBDKP2DCMA&contentType=json`);
    let json = await fetchResult.json();
    return json;
}

async function getDailyJson(location, fromDate, toDate) {
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${fromDate}/${toDate}?unitGroup=metric&include=days&key=CPDRKTZAL4B8C8GGBDKP2DCMA&contentType=json`);
    let json = await response.json()
    return json;
}

/* parameters:
time
1 conditions(partially cloudy)
2 icon 
3 temperature, feelslike
4 visibility
5 humidity 
6 precipitation , precipitation probability
7 windspeed
8 cloudcover
9 uv index
*/