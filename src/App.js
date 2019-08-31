import React from 'react';
import GoogleMapReact from 'google-map-react';
import './App.scss';

function App() {
  return (
    <div className="fullscreen">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDJZSSCXHWx0a8iWMo6IasDiHNEI9589Qg" }}
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
