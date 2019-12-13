import React from 'react';
import './weather.css';

function Weather(props) {
  return (
    <div className="weather-page shadow p-3 mb-5 bg-white rounded container">
      <div className="icon"></div>
      <div className="city">{props.city}</div>
      <div className="time">{props.time}</div>
      <div className="temp rounded-circle">
        <span>{props.temp}°C</span>
      </div>
      <div className="summary">
        <i>{props.summary}</i>
      </div>
      <footer className="footer">
        <a href="https://darksky.net/dev"> API by DarkSky</a>
      </footer>
    </div>
  );
}

export default Weather;
