import './stations.css'
import React from 'react'

export default function Stations(props) {
  return (
    <div className='stations'>
      {props.listOfStations}
    </div>

  )
}
