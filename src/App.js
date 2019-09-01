import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.scss';
import request from 'request-promise-native';
function App() {
  const _onClick = async ({ lat, lng }) => {
    try {
      //Using a CORS proxy because OpenWeather doesn't supply an Access-Control-Allow-Origin header
      const response = JSON.parse(await request(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat.toFixed(2)}&lon=${lng.toFixed(2)}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`));

      //Map the desired values obtained from OpenWeather
      const { main, name: location, sys, weather, wind } = response;
      const { humidity, temp } = main;
      const { sunrise, sunset } = sys;
      const { main: condition } = weather;
      const { speed, deg } = wind;

      //Display a dialog with the values.
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
      <div style={{ position: "absolute", bottom: "2vmin", left: "2vmin", color: "#FFF", backgroundColor: "#2E4C62", padding: "1em" }}>
      </div>
    </div>
  );
}

export default App;
