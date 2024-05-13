import Stations from '../Stations/Stations';
import './dashboard.css';
import React, { useEffect, useState } from "react";


export default function Dashboard() {

  const [fetchedStations, setState] = useState(undefined);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {

    fetch('http://localhost:5000/stazioni', {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
          setState(fetchedStations)
        });
      }
    }).catch(err => {
      console.log(err)
      setHasError(true)
    })
  })

  if (hasError) {
    return <p>Error</p>
  }

  return (
    <div className='dashboard'>
      <Stations listOfStations={fetchedStations}></Stations>
    </div>
  )
}
