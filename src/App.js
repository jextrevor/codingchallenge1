import React from 'react';
import GoogleMapReact from 'google-map-react';
import './App.scss';

function App() {
  return (
    <div className="fullscreen">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33
        }}
        defaultZoom={11}
      >
      </GoogleMapReact>
    </div>
  );
}

export default App;
