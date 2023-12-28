import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";

export default function WeatherBox({ long, lat }) {
    // change weather to forecast for the 5 days 3 hour forecast
    const [weatherData, setWeatherData] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function getWeather() {
            await axios.get(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
                .then((response) => {
                    setWeatherData(response.data);
                    setLoaded(true);
                }).catch(error => {
                    console.log(error);
                });
        }
        getWeather();
    }, [long, lat]);

    if (loaded) {
        return (
            <div className="weather">
                <div className="weather-box">
                    <div className="weather-heading">
                        <div className="location">
                            {weatherData.name}
                        </div>
                    </div>
                    <div className="weather-body">
                        <div className="temp">
                            {weatherData.main.temp}°C
                        </div>

                        {weatherData.weather[0].main}
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="icon"></img>
                    </div>


                </div>
            </div>)
    }
    else {
        return (<div className="loading-message">
            Loading...
        </div>)

    }
}