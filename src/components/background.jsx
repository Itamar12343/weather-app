import "../style/background.css";
import store from "../redux/store";
import { useState } from "react";

const Background = () => {
  const [state, setState] = useState("suny");

  store.subscribe(()=>{
    setState(store.getState().weatherReducer);
  });
    return ( 
        <div className="container">
          <div className={`background-${state}`}></div>
        </div>
     );
}
 
export default Background;