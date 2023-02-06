import { useEffect, useState } from "react";
import "../style/displaydata.css";
import store from "../redux/store";

const DisplayData = () => {
    const apiKey = "5a43de308e2894b86234fca27712c179";
    const [city, setcity] = useState("");
    const [title, setTitle] = useState("");
    const [temp, setTemp] = useState("");
    const [svg, setsvg] = useState(null);

    store.subscribe(()=>{
        setcity(store.getState);
    });

    function getCurrentWeather(latitude,longitude){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(respons=> respons.json())
        .then(data=>{
            const gotTemp = Math.round(data.main.temp - 273);
            setTemp(gotTemp);
        });
    }

    function gotlocation (location){
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        getCurrentWeather(latitude,longitude);
        const apiToGetTheState = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        fetch(apiToGetTheState)
        .then(respond=> respond.json())
        .then(data=>{
            setTitle(data.city);
        });
    }

    function errlocation(location){
        console.log("err location");
    }
   
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(gotlocation,errlocation);
    },[]);



    useEffect(()=>{
        if(city.length > 0){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then((response) =>{ 
            if(!response.ok){
                throw Error(response.status);
            }else{
                return response.json()
            }
        })
        .then((data) => {
           console.log(data);
           const gotTemp = Math.round(data.main.temp - 273);
            setTemp(gotTemp);
            setTitle(data.name);
            const weatherState = data.weather[0].main;
            const weatherDescription = data.weather[0].description;

            if(weatherState === "Clear"){
                setsvg("suny");
            }else if(weatherState === "Clouds"){
                setsvg("cloudy");
            }
         })
         .catch((error) => {
           console.log("error");
         });
        }
    },[city]);

    return ( 
        <div className="display-box">
            <div className="title">{title}</div>
            <div className="weather-img"></div>
            <div className="temp">{temp}</div>
        </div>
     );
}
 
export default DisplayData;