import Map from '../Map/Map';
import './dashboard.css';
import React, { useEffect, useState } from "react";

const backendUri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080';

console.log(backendUri)
export default function Dashboard() {
  const [fetchedStations, setFetchedStations] = useState(undefined);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(`${backendUri}/stations`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const stationsData = await response.json();
        setFetchedStations(stationsData);
      } catch (error) {
        console.error('Fetch error: ', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, []); // Chiamata API eseguita solo una volta al caricamento

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return <p>Error fetching stations</p>;
  }

  return (
    <div className='dashboard'>
      <p>THIS IS THE DASHBOARD</p>
    </div>
  );
}
