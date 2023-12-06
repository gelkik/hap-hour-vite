import React from "react";
import HappyHour from "./HappyHour";
import seedData from '../seedData.json'

const Home = () => {
    
    // console.log(seedData[0].restaurant_name)
    return (
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
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