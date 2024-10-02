import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './mappa.css';
import markerIcon from './marker-icon-2x.png';

const backendUri = import.meta.env.VITE_BACKEND_ENDPOINT;

const iconPerson = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(20, 30),
  className: 'leaflet-div-icon',
  popupAnchor: [0, 0]
});


export { iconPerson };

export default function Mappa() {

  const [fetchedStations, setFetchedStations] = useState(undefined);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {

      setIsLoading(true);

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
        setIsLoading(false);

      } catch (error) {
        console.error('Fetch error: ', error);
        setHasError(true);
        setIsLoading(false);

      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, []); // Chiamata API eseguita solo una volta al caricamento


  if (!fetchedStations) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return <p>Error fetching stations</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const firstStation = fetchedStations[0];
  const position = [firstStation.lat / 100000, firstStation.lon / 100000];

  const handleShowDetails = (station) => {
    console.log('show details');
    console.log(station)
  }

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
            position={[new_lat, new_lon]}
            icon={iconPerson}
            key={index}
            eventHandlers={{
              click: (e) => {
                console.log('marker clicked', e)
                handleShowDetails(station)
              }
            }}
          >
            <Popup>
              <ul>
                <li>Nome: {station.nomestaz}</li>
                <li>ID: {station.idstazione}</li>
                <li>Latitudine: {station.lat}</li>
                <li>Longitudine: {station.lon}</li>
              </ul>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
}
