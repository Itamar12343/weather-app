import { useEffect, useState } from "react";
import "../style/displaydata.css";
import store from "../redux/store";

const DisplayData = () => {
    const apiKey = "5a43de308e2894b86234fca27712c179";
    const [city, setcity] = useState("");

    store.subscribe(()=>{
        setcity(store.getState);
    });

    const gotlocation = (location)=>{
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const apiToGetTheState = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        fetch(apiToGetTheState)
        .then(respond=> respond.json())
        .then(data=>{
            console.log(data.city);
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
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},uk&appid=${apiKey}`)
        .then((response) =>{ 
            if(!response.ok){
                throw Error(response.status);
            }else{
                return response.json()
            }
        })
        .then((data) => {
           console.log(data);
         })
         .catch((error) => {
           console.log("error");
         });
        }
    },[city]);

    return ( 
        <div className="display-box">
            
        </div>
     );
}
 
export default DisplayData;