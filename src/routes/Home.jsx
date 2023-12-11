import React, { useState } from "react";
import HappyHour from "./HappyHour";
import seedData from '../seedData.json'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Home = () => {
    const maps_key = import.meta.env.GOOGLE_MAPS_API_KEY
    
    const [map,setMap] = useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${maps_key}`
      })
    
    const containerStyle = {
        width: '400px',
        height: '400px',
    };

    const center = {
        lat: -34.397,
        lng: 150.644,
    };

    const handleMapLoad = (map) => {
        setMap(map);
    };

    return (
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={handleMapLoad}
                >
                    {/* {seedData.map((seed) => (
                        <Marker
                            key={seed.restaurant_name}
                            position={{ lat: seed.latitude, lng: seed.longitude }}
                        />
                    ))} */}
                </GoogleMap>
            )}

            {seedData.map((seed) => (
                <HappyHour
                    key={seed.restaurant_name} 
                    name={seed.restaurant_name}
                    time={seed.happy_hour_time}
                    link={seed.link}
                    food={seed.food_offered}
                />
            ))}
        </div>
        
    )
}

export default Home;