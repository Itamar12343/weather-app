import { useSelector, useDispatch } from "react-redux";
import Searchbar from "./components/searchbar";
import DisplayData from "./components/displayData";
import Background from "./components/background";

function App() {
  //const text = useSelector(state=> state);
  const dispatch = useDispatch();

  //console.log(text);

  /*document.onclick = ()=>{
    dispatch({type: "change",text: "fgyui"});
  }*/

    return (
    <div className="App">
      <Searchbar/>
      <DisplayData/>
      <Background/>
    </div>
  );
}

export default App;
