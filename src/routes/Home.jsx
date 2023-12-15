import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useRef, useState,useEffect } from "react";
import HappyHour from "./HappyHour";
import seedData from '../seedData.json'
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const Home = () => {
    
    // const [map,setMap] = useState(null)
    const mapContainer = useRef(null);
    // const map = useRef(null);
    // 40.7831° N, 73.9712° W
    const [lng, setLng] = useState(-73.9712);
    const [lat, setLat] = useState(40.7831);
    const [zoom, setZoom] = useState(10);

    const handleZoomClick = (e) =>{
        // setLat(e.latitude)
        // setLng(e.longitude)
        // setZoom(14)
        console.log(lng,lat,e.restaurant_name)
    }

    useEffect(() => {
        if (!mapContainer.current) return
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        
        seedData.forEach((seed) => {
            const marker = new mapboxgl.Marker({
                color: 'red', 
            })
                .setLngLat([seed.longitude, seed.latitude])
                .setPopup(new mapboxgl.Popup().setHTML(`<a href="${seed.link}" target="_blank" class="text-sm font-semibold hover:underline cursor-pointer" id="marker-link-${seed.restaurant_name}">${seed.restaurant_name}</a>`))
                .addTo(map);
    
        });
        return () => map.remove();
    }, [mapContainer, lng, lat, zoom]);



    return (
        <div>

            <div ref={mapContainer} className="h-96" />    

            {seedData.map((seed) => (
                <HappyHour
                    key={seed.restaurant_name} 
                    seed={seed}
                    setLng={setLng}
                    setLat={setLat}
                    setZoom={setZoom}
                />
            ))}
        </div>
        
    )
}

export default Home;