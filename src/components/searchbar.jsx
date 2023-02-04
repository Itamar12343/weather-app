import "../style/searchbar.css";
import { Search } from "react-bootstrap-icons";

const Searchbar = () => {
    return ( 
        <div className="search">
            <input type="text" className="input" placeholder="search a city"/>
            <Search className="search-btn"/>
        </div>
     );
}
 
export default Searchbar;