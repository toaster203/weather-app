import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./weather.css";

import { Search } from 'semantic-ui-react';
import debounce from "debounce";

export default function WeatherBox({ long, lat }) {
    const [weatherData, setWeatherData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [val, setVal] = useState('');
    const [results, setResults] = useState([]);
    const cities = require('../city.list.json');

    //need to add debounce so search isn't as slow
    function updateSearch(event) {
        setVal(event.target.value);
        console.log(event.target.value);
        if (event.target.value.length >= 2) {
            setResults(cities.filter((city) => { return event.target.value && city.name.toLowerCase().startsWith(event.target.value.toLowerCase()) }));
        }
    }

    function selectVal(result) {
        setVal(result.name);
        getCityWeather(result.id);
    }

    async function getCityWeather(id) {
        console.log(id);
        //check if val is not empty, then api call
        await axios.get(`${process.env.REACT_APP_API_URL}/weather?id=${id}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then((response) => {
                setWeatherData(response.data);
                setLoaded(true);
            }).catch(error => {
                console.log(error);
            });
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

    if (loaded) {
        return (
            <div className="weather">
                <div className="search-bar">
                    {/*<input
                        type="text"
                        className="cityInput"
                        placeholder="Search"
                        value={val}
                        onChange={(e)=> setVal(e.target.value)}/>
                    <div className="search-icon">
                        <button onClick={updateSearch} className="search"><img src={search_icon} alt=""/></button>
                    </div>*/}

                    <Search
                        placeholder="Search for a city..."
                        onSearchChange={updateSearch}
                        minCharacters={2}
                        onResultSelect={(e, data) =>
                            selectVal(data.result)
                        }
                        resultRenderer={(result) => <div key={result.id}>{result.name}, {result.country}</div>}
                        value={val}
                        results={results}
                        noResultsMessage='No cities match the search' />
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