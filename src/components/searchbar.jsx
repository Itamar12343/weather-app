import "../style/searchbar.css";
import { Search } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";

const Searchbar = () => {
    const dispatch = useDispatch();

    function setSearchkey(e){
        dispatch({type: "change",text: e.target.value});
    }

    return ( 
        <div className="search">
            <input type="text" className="input" placeholder="search a city" onKeyUp={setSearchkey}/>
            <Search className="search-btn"/>
        </div>
     );
}
 
export default Searchbar;