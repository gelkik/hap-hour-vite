import React, { useState,useEffect } from "react";
import seedData from '../seedData.json'
import HappyHours from './HappyHours'


const HappyHour = ({setLat,setLng,setZoom}) =>{
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const dynamoDb = new AWS.DynamoDB.DocumentClient();

            const params = {
              TableName: 'Restaurants',
            };
            
            const result = await dynamoDb.scan(params).promise();
    
            setData(result.Items);
          } catch (error) {
            console.error("Error fetching data from DynamoDB:", error);
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