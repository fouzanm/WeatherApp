async function getWeather() {
    const city = document.getElementById("city").value;
    const weatherResult = document.getElementById("weather-result");
  
    if (!city) {
      weatherResult.innerHTML = "Please enter a city name.";
      return;
    }
    weatherResult.innerHTML = `<div class="loading">Loading...</div>`;
    try {
      const response = await fetch(`http://localhost:3000/weather?city=${city}`);
      const data = await response.json();
      
      if (data.error) {
        weatherResult.innerHTML = `
            <h4 class="error">${data.error}</h4>`;
      } else {
        weatherResult.innerHTML = `
            <h2>${data.city}</h2>
            <h4>${data.weather}</h4>        
            <h4>${data.condition}</h4>  
            <img src='https://openweathermap.org/img/wn/${data.icon}@2x.png' alt='Weather Icon'/>
            <h1>${data.temperature}°C</h1>
            <div class="details">
                <div class="sub-details">
                    <h5><b>MIN</b></h5>
                    <h5>${data.min}°C</h5>
                </div>
                <div class="sub-details">
                    <h5><b>MAX</b></h5>
                    <h5>${data.max}°C</h5>
                </div>
            </div>
        `;
      }
    } catch (error) {
      weatherResult.innerHTML = "Unable to fetch weather data.";
    }
  }
  