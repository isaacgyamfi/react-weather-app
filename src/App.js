import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Weather from './components/Weather/Weather';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationServiceOn: null,
      latitude: '',
      longitude: '',
      city: '',
      summary: '',
      time: '',
      temperature: null
    };
  }

  componentDidMount() {
    if (!navigator.geolocation) {
      this.setState({ locationServiceOn: false });
      return console.log(
        'Geolocation is not enabled on this device\nPlease turn on your location'
      );
    }
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      this.setState({ latitude: lat, longitude: long });
      getWeatherUpdate();
    });

    const getWeatherUpdate = () => {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/487b77b5cd6c1445a227c0b1034fb621/${this.state.latitude},${this.state.longitude}`
        )
        .then(res => {
          // console.log(res.data.currently);
          this.setState({
            city: res.data.timezone,
            summary: res.data.daily.summary,
            time: new Date().toUTCString(),
            temperature: (
              ((res.data.currently.temperature - 32) * 5) /
              9
            ).toFixed(1)
          });
        })
        .catch(err => console.log(err));
    };
  }
  render() {
    return (
      <div className="container">
        <Weather
          city={this.state.city}
          time={this.state.time}
          summary={this.state.summary}
          temp={this.state.temperature}
        />
      </div>
    );
  }
}

export default App;
