import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";

import search_icon from './assets/search.png'

export default function WeatherBox({ long, lat }) {
    const [weatherData, setWeatherData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [val, setVal] = useState('');

    function updateSearch(){
        console.log(val);
        //check if val is not empty, then api call
    }
    async function getWeather() {
        // change weather to forecast for the 5 days 3 hour forecast
        await axios.get(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then((response) => {
                setWeatherData(response.data);
                setLoaded(true);
            }).catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getWeather();
    }, [long, lat]);

    const search = async () => {
        // idk if this is supposed to be here
    }

    if (loaded) {
        return (
            <div className="weather">
                <div className="search-bar">
                    <input
                        type="text"
                        className="cityInput"
                        placeholder="Search"
                        value={val}
                        onChange={(e)=> setVal(e.target.value)}/>
                    <div className="search-icon">
                        <button onClick={updateSearch} className="search"><img src={search_icon} alt=""/></button>
                    </div>
                </div>
                <div className="location">
                    {weatherData.name}
                </div>
                <div className="temp">
                     {weatherData.main.temp}°C
                </div>
                <div className="weather-data">
                {weatherData.weather[0].main}
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="icon"></img>
                </div>
            </div>)
    }
    else {
        return (<div className="loading-message">
            Loading...
        </div>)

    }
}