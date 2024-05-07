/* Global Variables */
// const geoURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const geoURL = 'http://api.geonames.org/search?type=json&maxRows=1&username=vuongnd9&q=';
// const apiKey = '&appid=2520fbbb69466d6852b9b07264685f46&units=imperial';
const serverURL = 'http://localhost:8080';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Get data from GeoNames
let typingTimer;
let doneTypingInterval = 1500;
const place = document.getElementById('city');
if(place){
    place.addEventListener('keyup', ()=>{
        clearTimeout(typingTimer);
        if(place.value){
            typingTimer = setTimeout(()=>{
                getGeoInfo(place.value);
            }, doneTypingInterval);
        }
    });
}

function getGeoInfo(city){
    retrieveData(geoURL, city)
    .then(function(data){
        // let userResponse = document.getElementById('feelings').value;
        // postData(serverURL+'/data',{latitude: data.main.temp, date: newDate, userResponse:userResponse})
        updateUI(data);
    });
}

const retrieveData = async (url, city)=>{
   try{
        const request = await fetch(url+city);
        const geoOutput = await request.json();
        console.log("Gia tri GeoName:", geoOutput.geonames[0]);
        return geoOutput.geonames[0];
    }catch(error){
        console.log('errorRetrieveData', error);
    }
}

const postData = async (url = '', data = {}) => {
    try{
        await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }catch(error){
        console.log('errorPostData', error);
    }
}

const updateUI = async(data)=>{
    const request = await fetch(serverURL+'/all');
    try{
        document.getElementById('lat').innerHTML = `Latitude: ${data.lat}`;
        document.getElementById('long').innerHTML  = `Longitude: ${data.lng}`;
        document.getElementById('country').innerHTML = `Country: ${data.countryName}`;
    }catch(error){
        console.log('errorUpdateUI:', error);
    }
}

export{getGeoInfo}