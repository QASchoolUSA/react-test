import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=a661c644c6d1437df46b0c7277726ae2");
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        if (contentType && contentType.indexOf("application/json") !== -1) {
          const responseData = await response.json();
          console.log('API Response:', responseData); // Log the response

          // Assuming responseData is an object with a 'data' property that is an array
          if (responseData.data && Array.isArray(responseData.data)) {
            setData(responseData.data); // Set data to the array in responseData.data
          } else {
            throw new Error('Response data is not an array');
          }
        } else {
          const textResponse = await response.text();
          console.error('Response is not JSON:', textResponse); // Log the actual response text for debugging
          throw new Error('Response is not JSON');
        }

        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data}
      </ul>
    </div>
  );
};

export default Weather;
