import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import L from 'leaflet';

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
    if (!props.listOfStations) {
        return <p>Loading...</p>;
    }

    const firstStation = props.listOfStations[0];
    const position = [firstStation.lat / 100000, firstStation.lon / 100000];

    console.log(position)

    return (
        <MapContainer className='map' center={position} zoom={9} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {props.listOfStations.map((station, index) => {

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


            {/* <Marker
                key={1}
                position={position}
                icon={iconPerson}
            >
                <Popup>
                    <b>Prova</b><br />
                </Popup>
            </Marker> */}

        </MapContainer>
    );
}
