import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.scss';
import request from 'request-promise-native';
import moment from 'moment';

function App() {
  //Setup hooks
  const [display, setDisplay] = useState(false);
  const [weather, setWeather] = useState({});

  const _onClick = async ({ lat, lng }) => {
    try {
      setDisplay(false);
      
      //Using a CORS proxy because OpenWeather doesn't supply an Access-Control-Allow-Origin header
      const response = JSON.parse(await request(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat.toFixed(2)}&lon=${lng.toFixed(2)}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=imperial`));
      
      //Map the desired values obtained from OpenWeather
      const { main, name: location, sys, timezone, weather, wind } = response;
      const { humidity, temp } = main;
      const { sunrise, sunset } = sys;
      const { main: condition, description } = weather[0];
      const { speed, deg } = wind;

      //Set the state accordingly
      setWeather({
        location,
        humidity,
        temp,
        sunrise,
        sunset,
        timezone,
        condition,
        description,
        speed,
        deg
      })
      setDisplay(true);
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="fullscreen">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={{
          lat: 40.430322,
          lng: -111.8838247
        }}
        defaultZoom={15}
        onClick={_onClick}
      >
      </GoogleMapReact>
      <div className={`dialog${display ? ' visible' : ''}`}>
        <p><b>{weather.location}</b></p>
        <p>Weather: {weather.condition} ({weather.description})</p>
        <p>Temperature: {weather.temp}&deg;F</p>
        <p>Wind: {weather.speed}mph{weather.deg ? ` @ ${weather.deg}${String.fromCharCode(176)}` : ''}</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Sunrise: {moment.unix(weather.sunrise).add(weather.timezone,'seconds').utc().format('h:mm A')}</p>
        <p>Sunset: {moment.unix(weather.sunset).add(weather.timezone,'seconds').utc().format('h:mm A')}</p>
      </div>
    </div>
  );
}

export default App;
