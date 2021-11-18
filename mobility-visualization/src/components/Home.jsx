import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Header from './Header';
 
mapboxgl.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';


function Home() {
/*
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(45.908709328531586);
    const [lat, setLat] = useState(15.59735559337914);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lat, lng],
            zoom: zoom
        });

         Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // Clean up on unmount
        return () => map.remove();
        });*/

    return (
            <div className="">
                <Header />
                <p>Jaz sem mali pes in tukaj je moj dom (uta)!</p>    
            </div>
    )
}

export default Home
