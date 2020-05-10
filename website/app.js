/* Global Variables */
const generate = document.getElementById('generate')
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "28736653ad6c42f248388523a9ff3d0e"
let zip = "94203" // default zip code

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.'+ d.getDate()+'.'+ d.getFullYear();

//Helper functions
function getWeatherUrl(){
    return baseUrl + "zip=" + zip + "&appid=" + apiKey;
}

// get and post tasks
const getWeatherData = async ( url = '')=>{
      const response = await fetch(url);
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
 
  const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
       body: JSON.stringify(data) 
    });
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
// main functions
  function preformActionGenerate(){
    const feelingToday =  document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    if(zipCode !== ""){
        zip = zipCode;
    }    
    getWeatherData(getWeatherUrl())
    .then(function(data){
        postData('../add', {temperature: data.main.temp, date: newDate, user_response: feelingToday})
    })
    .then(function(){
        updateUI();
    });
  }

  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      const lastIndex = allData.length -1; 
      document.getElementById('date').innerHTML = allData[lastIndex].date;
      document.getElementById('temp').innerHTML = allData[lastIndex].temperature;
      document.getElementById('content').innerHTML = allData[lastIndex].user_response;
     }catch(error){
      console.log("error", error);
    }
  }

//events
generate.addEventListener('click', function(){
    preformActionGenerate();
});