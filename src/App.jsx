import './App.css';
import React, { useEffect, useState } from "react";
import Weather from  './components/Weather.tsx';

export default function App() {
  
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, [lat, long]);

  return (
    <div className="App">
      <Weather long={longitude} lat={latitude}/>
    </div>
  );
}