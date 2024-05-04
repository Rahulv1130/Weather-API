import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react';


export default function WeatherApp() {
    const [weatherInfo , setWeatherInfo] = useState({
        city: "Lucknow",
        feelsLike: 31.18,
        humidity: 33,
        temp: 31.99,
        tempMax: 31.99,
        tempMin: 31.99,
        weather: "haze"
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };
    return (
        <div>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}