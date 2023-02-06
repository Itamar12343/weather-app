import { useEffect, useState } from "react";
import "../style/displaydata.css";
import store from "../redux/store";
import {useDispatch} from "react-redux";

const DisplayData = () => {
    const apiKey = "5a43de308e2894b86234fca27712c179";
    const [city, setcity] = useState("");
    const [title, setTitle] = useState("");
    const [temp, setTemp] = useState("");
    const [img, setImg] = useState(null);
    const [description, setDescription] = useState(null);
    const [locationErr, setLocationErr] = useState(false);
    const dispatch = useDispatch();

    store.subscribe(()=>{
        setcity(store.getState().searchReducer);
    });

    function getCurrentWeather(latitude,longitude){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(respons=> respons.json())
        .then(data=>{
            const gotTemp = Math.round(data.main.temp - 273);
            setTemp(gotTemp);
            setTitle(data.name);
            const weatherState = data.weather[0].main;
            const weatherDescription = data.weather[0].description;
            setDescription(weatherDescription);

            if(weatherState === "Clear"){
                setImg("suny");
                dispatch({type: "set", text: "suny"});
            }else if(weatherState === "Clouds"){
                setImg("cloudy");
                dispatch({type: "set", text: "cloudy"});
            }else{
                setImg("rainy");
                dispatch({type: "set", text: "rainy"});
            }
        });
    }

    function gotlocation (location){
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        setLocationErr(false);
        getCurrentWeather(latitude,longitude);
        const apiToGetTheState = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        fetch(apiToGetTheState)
        .then(respond=> respond.json())
        .then(data=>{
            setTitle(data.city);
        });
    }

    function errlocation(location){
        setLocationErr(true);
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
           const gotTemp = Math.round(data.main.temp - 273);
            setTemp(gotTemp);
            setLocationErr(false);
            setTitle(data.name);
            const weatherState = data.weather[0].main;
            const weatherDescription = data.weather[0].description;
            setDescription(weatherDescription);

            if(weatherState === "Clear"){
                setImg("suny");
                dispatch({type: "set", text: "suny"});
            }else if(weatherState === "Clouds"){
                setImg("cloudy");
                dispatch({type: "set", text: "cloudy"});
            }else{
                setImg("rainy");
                dispatch({type: "set", text: "rainy"});
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
            <div className="description">{description}</div>
            <div className={`weather-${img}-img`}></div>
            <div className="temp">{temp}c</div>
            {locationErr && <div className="err">you didn't allow location</div>}
        </div>
     );
}
 
export default DisplayData;