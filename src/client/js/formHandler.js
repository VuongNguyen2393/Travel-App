
const { isPastDay, getRemainDays, formatDate, getDiffDays } = require("./dateHandler");

const serverURL = 'http://localhost:8080';

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click',handleCreateTrip);

async function handleCreateTrip(event){
    event.preventDefault();
    let destinationInput = document.getElementById('destination').value;
    let departDateInput = document.getElementById('departDate').value;
    let returnDateInput = document.getElementById('returnDate').value;


    //validate empty fields
    if(returnDateInput==='' || departDateInput==='' || destinationInput === ''){
        alert('Destination and Depart Date are required!!!');
        return;
    }

    if(getDiffDays(departDateInput, returnDateInput)<0){
        alert("Return date can't be the past of depart date");
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
        if(res.geoResponse.totalResultsCount==0){
            alert("Place not found");
            return;
        }
        updateUI(res, departDateInput, returnDateInput);
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
const updateUI = async(data,departDate, returnDate)=>{
    try{
        document.getElementById('output-destination').innerHTML = `Your trip to: ${data.geoResponse.geonames[0].name}, ${data.geoResponse.geonames[0].countryName}`;
        document.getElementById('output-depart-date').innerHTML = `Departing: ${formatDate(departDate)}`
        document.getElementById('output-trip-remain').innerHTML = `${data.geoResponse.geonames[0].name}, ${data.geoResponse.geonames[0].countryName} is ${getRemainDays(departDate)} days away`;
        document.getElementById('output-trip-duration').innerHTML = `The trip take ${getDiffDays(departDate, returnDate)} days duration`
        if(getRemainDays(departDate) > 15){
            document.getElementById('weather-forecast').innerHTML = 'Weather forcast is only available within next 15 days from today';
        }else{
            const departDateForecast = data.weatherResponse.data.find(x => x.datetime == formatDate(departDate));
            document.getElementById('weather-forecast').innerHTML = `
                <div>Typical weather for then is:</div>
                <div class="temperature">High: ${departDateForecast.high_temp}, Low: ${departDateForecast.low_temp}</div>
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