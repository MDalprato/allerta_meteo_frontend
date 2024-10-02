import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './mappa.css';
import greenIconUrl from './marker-icon-green.png';
import orangeIconUrl from './marker-icon-orange.png';
import redIconUrl from './marker-icon-red.png';

const backendUri = import.meta.env.VITE_BACKEND_ENDPOINT;

const greenIcon = new L.Icon({
  iconUrl: greenIconUrl,
  iconRetinaUrl: greenIconUrl,
  iconSize: new L.Point(30, 30),
  className: 'leaflet-div-icon',
  popupAnchor: [0, 0]
});

const orangeIcon = new L.Icon({
  iconUrl: orangeIconUrl,
  iconRetinaUrl: orangeIconUrl,
  iconSize: new L.Point(30, 30),
  className: 'leaflet-div-icon',
  popupAnchor: [0, 0]
});

const redIcon = new L.Icon({
  iconUrl: redIconUrl,
  iconRetinaUrl: redIconUrl,
  iconSize: new L.Point(30, 30),
  className: 'leaflet-div-icon',
  popupAnchor: [0, 0]
});

const getIconByValue = (station) => {
  if (station.soglia1 == 0 && station.soglia2 == 0 && station.soglia3 == 0) {
    // altrimenti è ingestibile
    return greenIcon;
  }

  if (station.value > station.soglia3) {
    return redIcon;
  } else if (station.value > station.soglia2) {
    return orangeIcon;
  } else if (station.value > station.soglia1) {
    return greenIcon;
  }
  return greenIcon; // Default icon
};

export default function Mappa() {
  const [fetchedStations, setFetchedStations] = useState(undefined);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${backendUri}/readings`, {
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
  const position = [firstStation.lat, firstStation.lon];

  const handleShowDetails = (station) => {
    console.log('show details');
    console.log(station);
  };

  return (
    <MapContainer className='map' center={position} zoom={9} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {fetchedStations.map((station, index) => {
        const icon = getIconByValue(station);


        
        return (
          <Marker
            position={[station.lat, station.lon]}
            icon={icon}
            key={index}
            title={station.nomestaz}
            eventHandlers={{
              click: (e) => {
                console.log('marker clicked', e);
                handleShowDetails(station);
              },
            }}
          >
            <Popup>
              <ul>
                <li>Nome: {station.nomestaz}</li>
                <li>ID: {station.idstazione}</li>
                <li>Latitudine: {station.lat}</li>
                <li>Longitudine: {station.lon}</li>
                <li>Valore: {station.value}</li>
              </ul>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}