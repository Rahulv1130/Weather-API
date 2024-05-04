import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './SearchBox.css'
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "e39607904a89cf9bfe40a52d0f6e52cd";
    let [city,setCity] = useState("");
    let [error,setError] = useState(false);

    let getWeatherInfo = async ()=> {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse=await response.json();
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            };
            console.log(result);
            return result;
        }
        catch(err){
            throw err;
        };
    }

    let handleChange = (e) => {
        setCity(e.target.value);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        setCity("");
        setError(false);
        try{
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }
        catch(err){
            setError(true);
        }
        
    }

    return(
        <div className="box">
            <div>
                <h3>Search For the Weather</h3>
                <form onSubmit={handleSubmit}>
                    <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange} required/>
                    <br></br> <br></br>
                    <Button variant="contained" type="submit"> Search </Button>
                </form>
            </div>
            {error==true? <Alert className="err" severity="error">Location not supported</Alert> :""}
        </div>
    );
}