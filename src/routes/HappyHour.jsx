import React, { useState,useEffect } from "react";
import HappyHours from './HappyHours'

const HappyHour = ({setLat,setLng,setZoom}) =>{
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const apiGatewayEndpoint = 'https://1mtcc5ovz0.execute-api.us-east-1.amazonaws.com/Test-1';

              const response = await fetch(`${apiGatewayEndpoint}/restaurants`);
              
              if (response.ok) {
                  const result = await response.json();
                  console.log(result)
                  setData(result);
              } 
              else {
                  console.error(`Error fetching data from API Gateway. Status: ${response.status}`);
              }
          } 
          catch (error) {
              console.error("Error fetching data from API Gateway:", error);
          }
      };
    
        fetchData();   
    }, []);

    if (!data) {
      return <p>Loading...</p>;
    }
    
    return (
        <div>  
            <div className="container my-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {data.map((seed) => (
                    <HappyHours
                        key={seed.restaurant_name} 
                        seed={seed}
                        setLng={setLng}
                        setLat={setLat}
                        setZoom={setZoom}
                    />
                ))}
            </div>
        </div>
    )
}

export default HappyHour;