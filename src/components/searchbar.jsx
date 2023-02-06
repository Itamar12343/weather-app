import "../style/searchbar.css";
import { Search } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";

const Searchbar = () => {
    const dispatch = useDispatch();
    const [showbtn, setshowbtn] = useState(true);

    function setSearchkey(e){
        dispatch({type: "change",text: e.target.value});

        if(window.innerWidth <= 578){
        if(e.target.value.length > 0){
            setshowbtn(false);
        }else{
            setshowbtn(true);
        }
    }
    }

    return ( 
        <div className="search">
            <input type="text" className="input" placeholder="search a city" onKeyUp={setSearchkey}/>
            <motion.div initial={{opacity: 0}} transition={{duration: 0.1}} animate={{opacity: showbtn ? 1 : 0}}>
            <Search className="search-btn"/>
            </motion.div>
        </div>
     );
}
 
export default Searchbar;