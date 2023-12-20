import React,{ useContext } from "react";
import AppContext from "../context/AppContext";

const Favorites = () => {

    const { user } = useContext(AppContext);

    return (
        <h1>Favorites</h1>
    )
}

export default Favorites;