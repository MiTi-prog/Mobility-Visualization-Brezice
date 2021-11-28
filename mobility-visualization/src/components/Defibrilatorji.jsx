import React, { useEffect, useState, useRef } from 'react';
import defibrilatorji from '../data/lokacije_defibrilatorjev.json';
import Header from './Header';
import ReactMapGL, {
  Marker,
  Popup, 
  NavigationControl
} from 'react-map-gl';
 
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
    
    const navControlStyle = {
      right: 50,
      top: 200
    };

    /*const map = mapRef.current.getMap();
    const rotateCamera = (timestamp) => {
      map.rotateTo((timestamp / 100) % 360, { duration: 0 })
      requestAnimationFrame(rotateCamera) 
    }*/
    
    const [selectedDefibrilator, setselectedDefibrilator] = useState(null);
    
    //[] - na koncu effecta tuki pove, da se ta akcija izvede samo 1x (enako kot componentDidMount())!
    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") { setselectedDefibrilator(null); }
      };
      window.addEventListener("keydown", listener)
    }, []);
    
      return(
        <div className="">
        <Header />
        <div className="w-full h-full">
            <ReactMapGL 
                {...viewport}
                width="100vw" 
                height="100vh" 
                mapStyle="mapbox://styles/mapbox/light-v10"
                onViewportChange={setViewport}
                mapboxApiAccessToken={'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw'}
                >
                
                {defibrilatorji.map(
                  defibrilator => (
                    <Marker 
                      key={defibrilator.opis} 
                      longitude={defibrilator.longitude} 
                      latitude={defibrilator.latitude} >

                        <button className="marker-btn" onClick={(e) => {
                          e.preventDefault();
                          setselectedDefibrilator(defibrilator);
                        }}>
                          <img src="mapbox-marker-icon-20px-green.png" alt="Marker icon"/>
                        </button>

                    </Marker>
                  ))
                }

                {selectedDefibrilator ? (
                  <Popup 
                    latitude={selectedDefibrilator.latitude}
                    longitude={selectedDefibrilator.longitude}
                    onClose={() => {
                      setselectedDefibrilator(null);
                    }}  
                  >
                    <div>
                      <h2><strong>{selectedDefibrilator.opis}</strong></h2>
                      <p>- {selectedDefibrilator.delovni_cas}</p>
                    </div>
                  </Popup>
                ) : null}
              <NavigationControl style={navControlStyle} />
            </ReactMapGL>
        </div>
        </div>
      );
}

export default Defibrilatorji
