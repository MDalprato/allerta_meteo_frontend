import Map from './Map'
import './stations.css'
import React from 'react'

export default function Stations(props) {

  if(props.listOfStations === undefined) {
    return <p>Loading...</p>
  }
  return (
    <div className='stations'>
      {/* {props.listOfStations.map((station, index) => (
        <div key={index}>{station.nomestaz}</div>
      ))} */}
      <Map listOfStations={props.listOfStations}></Map>
    </div>

  )
}
