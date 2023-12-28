import './App.css';
import React, { useEffect, useState } from "react";
import Weather from  './components/Weather.tsx';

export default function App() {
  
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, [latitude, longitude]);

  return (
    <div className="App">
        <Weather long={longitude} lat={latitude}/>
      
    </div>
  );
}