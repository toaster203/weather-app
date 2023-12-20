import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherBox({ long, lat }) {
    // change weather to forecast for the 5 days 3 hour forecast
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        async function getWeather() {
            await axios.get(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
                .then((response) => {
                    setWeatherData(response.data);
                }).catch(error => {
                    console.log(error);
                });
        }
        getWeather();
    }, [long, lat]);

    return (
        <div className="weather-box">
            {weatherData.main.temp}°C
            <div className="weather">
                {weatherData.weather[0].main}
            </div>
        </div>
    )
}