import React, { useEffect, useState } from 'react';
import kolesa from '../data/izposojevalnice_koles.json';
import Header from './Header';
import ReactMapGL, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';
 
ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';

function IzposojevalniceKoles() {
    const [long, SetLong] = useState(15.5965);
    const [lat, SetLat] = useState(45.9088);
    
    const [viewport, setViewport] = React.useState({
        longitude: long,
        latitude: lat,
        center: [long, lat],
        zoom: 13
    });

    const navControlStyle= {
      right: 50,
      top: 200
    };

    const fullscreenControlStyle= {
      right: 50,
      top: 150
    };

    const [selectedBike, setSelectedBike] = useState(null);
    
    //[] - na koncu effecta tuki pove, da se ta akcija izvede samo 1x (enako kot componentDidMount())!
    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") { setSelectedBike(null); }
      };
      window.addEventListener("keydown", listener)
    }, []);
    
      return(
        <div className="map-component">
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
                
                {kolesa.map(
                  kolo => (
                    <Marker 
                      key={kolo.opis_lokacije} 
                      longitude={kolo.LON} 
                      latitude={kolo.LAT} 
                    >

                        <button className="marker-btn" onClick={(e) => {
                          e.preventDefault();
                          setSelectedBike(kolo);
                        }}>
                          <img src="mapbox-marker-icon-20px-green.png" alt="Marker icon"/>
                        </button>

                    </Marker>
                  ))
                }

                {selectedBike ? (
                  <Popup 
                    latitude={selectedBike.LAT}
                    longitude={selectedBike.LON}
                    onClose={() => {
                      setSelectedBike(null);
                    }}
                    closeOnClick={false}  
                  >
                    <div>
                      <h2><strong>{selectedBike.lokacija}</strong></h2>
                      <p>{selectedBike.opis_lokacije}</p>
                    </div>
                  </Popup>
                ) : null}


              <NavigationControl style={navControlStyle} />
              <FullscreenControl style={fullscreenControlStyle} />      
            </ReactMapGL>
        </div>
        
        </div>

      );
}

export default IzposojevalniceKoles