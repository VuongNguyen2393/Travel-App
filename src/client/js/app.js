/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2520fbbb69466d6852b9b07264685f46&units=imperial';
const serverURL = 'http://localhost:8080';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Get data from Open Weather
const button = document.getElementById('generate');
if(button){
    button.addEventListener('click', performAction);
}

function performAction(){
    let zipCode = document.getElementById('zip').value;
    retrieveData(baseURL, zipCode, apiKey)
    .then(function(data){
        let userResponse = document.getElementById('feelings').value;
        postData(serverURL+'/data',{temperature: data.main.temp, date: newDate, userResponse:userResponse})
        updateUI()
    });
}

const retrieveData = async (url, zip, key)=>{
   try{
        const request = await fetch(url+zip+key);
        return await request.json();
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

const updateUI = async()=>{
    const request = await fetch(serverURL+'/all');
    try{
        const data = await request.json();
        console.log(data);
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML  = data.temperature;
        document.getElementById('content').innerHTML = data.userResponse;
    }catch(error){
        console.log('errorUpdateUI:', error);
    }
}

export{performAction}