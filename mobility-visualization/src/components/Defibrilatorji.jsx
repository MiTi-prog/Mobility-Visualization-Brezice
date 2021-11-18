import React, { useRef, useEffect, useState } from 'react';
import defibrilatorji from '../data/lokacije_defibrilatorjev.json';
import Header from './Header';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 
mapboxgl.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';

function Defibrilatorji() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(45.908709328531586);
    const [lat, setLat] = useState(15.59735559337914);
    const [zoom, setZoom] = useState(10.8);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lat, lng],
            zoom: zoom
        })

        
        defibrilatorji.map((data) => {
            const marker = new mapboxgl.Marker()
            .setLngLat([data.longitude, data.latitude])
            .setPopup(new mapboxgl.Popup({ offset: 30 })
            .setHTML('<h4>' + data.opis + '</h4>'+ data.delovni_cas))
            .addTo(map.current);
        })
    })

    //looping JSON 

    return (
        <div className="h-screen">
            <Header />
            <div ref={mapContainer} className="map-container"/>
            {/* <header className="bg-white shadow">
                <div className="max-w-full mx-auto py-6">
                    <h1 className="text-3xl font-bold text-gray-900 px-4 sm:px-6 lg:px-8">Defibrilatorji</h1>
                </div>
            </header>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
                {
                    defibrilatorji.map (data => 
                        <div>
                            <span><b> Opis lokacije: </b>{data.opis}</span>
                            <span><b> Delovni čas: </b>{data.delovni_cas}</span>
                            <span><b> Longitude: </b>{data.longitude}</span>
                            <span><b> Latitude: </b>{data.latitude}</span>    
                        </div>
                    )
                }
            </div>
            </div>*/}
        </div>    
    )
}

export default Defibrilatorji
