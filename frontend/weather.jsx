import React from 'react';

// api key: f568b964469e73afb240e0462a6b9239

const toQueryStr = (apiData) => {
    const parts = [];
    for (let part in apiData) {
        if (apiData.hasOwnProperty(part)) {
            parts.push(`${encodeURIComponent(part)}=${encodeURIComponent(apiData[part])}`);
        }
    }
    return parts.join('&');
}

export default class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: null
        };
        this.getWeather = this.getWeather.bind(this);
        this.reset = this.reset.bind(this);

    }

    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(this.getWeather, console.log('fail'));
    // }

    reset() {
        this.setState({
            weather: null
        });
    }

    getWeather() {
        let url = 'http://api.openweathermap.org/data/2.5/weather?';
        const apiKey = 'f568b964469e73afb240e0462a6b9239';

        // const position = {
        //     lat: location.coords.latitude,
        //     lon: location.coords.longitude
        // };
        
        const zip = {
            zip: document.getElementById('zip').value
        }
        url += toQueryStr(zip);
        url += `&APPID=${apiKey}`;

        const XMLReq = new XMLHttpRequest();
        XMLReq.onreadystatechange = () => {
            if (XMLReq.status === 200 && XMLReq.readyState === XMLHttpRequest.DONE) {
                const weatherData = JSON.parse(XMLReq.responseText);
                this.setState({
                    weather: weatherData
                });
            }
        };

        XMLReq.open('GET', url, true);
        XMLReq.send();
    }

    render() {
        let data = <div></div>

        if (this.state.weather) {
            const weather = this.state.weather;
            const temperature = (weather.main.temp - 273.15) * 1.8 + 32
            data = <div className='loaded'>
                <span>{weather.name} </span>
                <span>{temperature.toFixed(1)}&#8457;</span>
                <span>{weather.weather[0].description} </span>
                <button className='reset' onClick={this.reset}>Reset</button>
            </div>;
        } else {
            data = <>
                <div className='loading'> Weather is loading... <i className="icon-small fa fa-spinner fa-spin"></i></div>
                <div className='zip-input'>
                    <input type="text" name="" id='zip' placeholder='Enter Zip Code'/>
                    <button className='get-weather' onClick={this.getWeather}>Get Weather</button>
                </div>
            </>
        }


        return (
            <div className='widget'>
                <h1 className='title'>Weather <i className="icon fa fa-cloud-sun-rain"></i></h1>
                <div className='weather'>
                    {data}
                </div>
            </div>
        )
    }
}