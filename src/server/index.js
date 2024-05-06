const dotenv = require('dotenv')
dotenv.config();
// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = process.env.PORT;

//get request
app.get('/all', (req, res) => {
    res.send(projectData);
  });

//post request
app.post('/data', (req, res)=>{
  let newData = req.body;
  projectData.temperature = newData.temperature;
  projectData.date = newData.date;
  projectData.userResponse = newData.userResponse;
})

function listening(){
  console.log(`App listening on port ${port}`);
}

//listening
const server = app.listen(port, listening);