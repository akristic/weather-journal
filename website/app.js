/* Global Variables */
const generate = document.getElementById('generate')
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "&appid=28736653ad6c42f248388523a9ff3d0e"
let zipPart = "zip=94203" // default zip code

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.'+ d.getDate()+'.'+ d.getFullYear();

//Helper functions
function getWeatherUrl(){
    return baseUrl + zipPart + apiKey;
}

// get and post tasks
const getData = async ( url = '')=>{
      const response = await fetch(url);
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
 
  const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
       body: JSON.stringify(data), 
    });
      try {
        const newData = await response.json();
        console.log(newData);
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
        zipPart = `zip=${zipCode}`;
    }    
    getData(getWeatherUrl())
    .then(function(data){
        postData('../add', {temperature: data.main.temp, date: newDate, user_response: feelingToday})
    });
  }

//events
generate.addEventListener('click', function(){
    preformActionGenerate();
});