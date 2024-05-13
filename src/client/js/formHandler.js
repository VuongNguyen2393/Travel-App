
const { isPastDay, getRemainDays, formatDate } = require("./dateHandler");

const serverURL = 'http://localhost:8080';

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click',handleCreateTrip);

async function handleCreateTrip(event){
    event.preventDefault();
    let destinationInput = document.getElementById('destination').value;
    let departDateInput = document.getElementById('departDate').value;

    //validate empty fields
    if(departDateInput==='' || destinationInput === ''){
        alert('Destination and Depart Date are required!!!');
        return;
    }

    //validate input date
    if(isPastDay(departDateInput)){
        alert('Your depart date has passed');
        return;
    }    

    //fetch API
    await sendDataToServer(serverURL + '/info', {destination: destinationInput})
    .then(res => res.json())
    .then((res)=>{
        updateUI(res, departDateInput);
    })
}

// Function to send data to the server
const sendDataToServer = async (url = '', data = {}) => {
    try{
        return await fetch(url, {
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

// Function to update result to UI
const updateUI = async(data,departDate)=>{
    try{
        document.getElementById('output-destination').innerHTML = `${data.geoResponse.geonames[0].name}`;
        document.getElementById('output-country').innerHTML = `${data.geoResponse.geonames[0].countryName}`;
        document.getElementById('output-depart-date').innerHTML = `${formatDate(departDate)}`
        if(getRemainDays(departDate) > 15){
            console.log(`ua aloooooo`);
            document.getElementById('weather-forecast').innerHTML = 'Weather forcast is only available within next 15 days from today';
        }else{
            const departDateForecast = data.weatherResponse.data.find(x => x.datetime == formatDate(departDate));
            document.getElementById('weather-forecast').innerHTML = `
                <div class="high-temp">${departDateForecast.high_temp}</div>
                <div class="low-temp">${departDateForecast.low_temp}</div>
                <div class="description">${departDateForecast.weather.description}</div>
            `
        }
        insertImage(data.pixaResponse.hits[0].largeImageURL);
    }catch(error){
        console.log('ErrorUpdateUI:', error);
    }
}

//insert the image
const insertImage = (imageUrl)=>{
    const imgElement = document.getElementById("output-image");
    imgElement.src = imageUrl;
    imgElement.style.width = 150;
}