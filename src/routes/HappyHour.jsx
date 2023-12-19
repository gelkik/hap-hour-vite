import React, { useState, useContext } from "react";
import Heart from "react-animated-heart";
import AppContext from "../context/AppContext";

const HappyHour = ({seed,setLat,setLng,setZoom}) => {
    const { user } = useContext(AppContext)

    const [isclick, setClick] = useState(false);

    const handleZoomClick = () =>{
        setLat(seed.latitude)
        setLng(seed.longitude)
        setZoom(15)
    }



    return (
        <div className="container my-12 mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                    <article className="overflow-hidden rounded-lg shadow-lg">
                        {/* <a href="#">
                            <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random"/>
                        </a> */}
                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 className="text-lg">
                                <a className="no-underline hover:underline text-black cursor-pointer"onClick={handleZoomClick}>
                                    {seed.restaurant_name}
                                </a>
                            </h1>
                            <p className="text-grey-darker text-sm">
                                {seed.happy_hour_time}
                            </p>
                        </header>
                        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                            <a className="flex items-center no-underline hover:underline text-black" target="_blank" href={seed.link}>
                                <p className="ml-2 text-sm">
                                    {seed.link}
                                </p>
                            </a>
                            <a className="no-underline text-grey-darker hover:text-red-dark">
                                <span className="hidden">Like</span>
                                <div className="App">
                                    <Heart isclick={isclick} onClick={() => setClick(!isclick)} />
                                </div>
                            </a>
                        </footer>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default HappyHour;