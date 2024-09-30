import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';

const backendUri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080';


const iconPerson = new L.Icon({
  iconUrl: require('./marker-icon-2x.png'),
  iconRetinaUrl: require('./marker-icon-2x.png'),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(20, 30),
  className: 'leaflet-div-icon'
});

export { iconPerson };



export default function Map(props) {

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


  if (!fetchedStations) {
    return <p>Loading...</p>;
  }

  const firstStation = fetchedStations[0];
  const position = [firstStation.lat / 100000, firstStation.lon / 100000];


  return (
    <MapContainer className='map' center={position} zoom={9} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {fetchedStations.map((station, index) => {

        const new_lat = station.lat / 100000;
        const new_lon = station.lon / 100000;

        return (
          <Marker
            key={index}
            position={[new_lat, new_lon]}
            icon={iconPerson}
          >
            <Popup>
              <p>ciao</p>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
}
