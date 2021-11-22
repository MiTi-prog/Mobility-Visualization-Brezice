import React, { useRef, useEffect, useState } from 'react';
import defibrilatorji from '../data/lokacije_defibrilatorjev.json';
import Header from './Header';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import ReactMapGL, { Marker } from 'react-map-gl';
 
ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';

function Defibrilatorji() {
    const [long, SetLong] = useState(15.5965);
    const [lat, SetLat] = useState(45.9088);
    
    const [viewport, setViewport] = React.useState({
        longitude: long,
        latitude: lat,
        center: [long, lat],
        zoom: 11
      });
    
      // Only rerender markers if props.data has changed
      const markers = React.useMemo(() => defibrilatorji.map(
        defibrilator => (
          <Marker key={defibrilator.opis} longitude={defibrilator.longitude} latitude={defibrilator.latitude} >
            <img src="../assets/images/marker.png" />
          </Marker>
        )
      ));
    
      return (
        <div className="">
            <Header />
            <ReactMapGL 
                {...viewport}
                width="100vw" 
                height="100vh" 
                mapStyle="mapbox://styles/mapbox/light-v10"
                onViewportChange={setViewport}
                mapboxApiAccessToken={'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw'}
                >
            {markers}
            </ReactMapGL>
        </div>
      );
}

export default Defibrilatorji
