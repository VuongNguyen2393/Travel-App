// Require Express to run server and routes
const express = require('express');
const dotenv = require('dotenv')
dotenv.config();

// Start up an instance of app
const app = express();
const cors = require('cors');

/* Middleware*/
//Here we are configuring express middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

// Setup Server
const port = process.env.PORT;
const geoUserName = process.env.GEO_USERNAME;
const weatherKey = process.env.WEATHER_KEY;
const pixaKey = process.env.PIXA_KEY

//get request
app.get('/', (req, res) => {
  res.sendFile('dist/index.html')
});

//post request
app.post('/info', async(req,res) => {
  try{
    const destination  = req.body.destination;
    const geoAPI = `http://api.geonames.org/search?type=json&maxRows=1&username=${geoUserName}&q=${destination}`;
    const geoResponse = await fetchAPI(geoAPI)
    if(geoResponse.totalResultsCount==0){
      res.send({geoResponse});
      return;
    }

    const weatherAPI = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${weatherKey}&lat=${geoResponse.geonames[0].lat}&lon=${geoResponse.geonames[0].lng}`;
    const weatherResponse = await fetchAPI(weatherAPI);

    const pixaAPI = `https://pixabay.com/api/?key=${pixaKey}&image_type=photo&per_page=3&pretty=true&q=${destination}`;
    const pixaResponse = await fetchAPI(pixaAPI);

    res.send({geoResponse,weatherResponse,pixaResponse});

  }catch(error){
    console.log('errorRetrieveData', error);
  }
})

const fetchAPI = async (url) => {
  const response = await fetch(url);
  return await response.json();
}

function listening(){
  console.log(`App listening on port ${port}`);
}

//listening
const server = app.listen(port, listening);