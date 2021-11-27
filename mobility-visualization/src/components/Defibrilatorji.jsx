import React, { useEffect, useState } from 'react';
import defibrilatorji from '../data/lokacije_defibrilatorjev.json';
import Header from './Header';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
 
ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';

function Defibrilatorji() {
    const [long, Setlongitude] = useState(15.5965);
    const [lat, Setlatitude] = useState(45.9088);
    
    const [viewport, setViewport] = React.useState({
        longitudegitude: long,
        latitudeitude: lat,
        center: [long, lat],
        zoom: 11
      });
    
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
                height="94vh" 
                mapStyle="mapbox://styles/mapbox/light-v10"
                onViewportChange={setViewport}
                mapboxApiAccessToken={'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw'}
                >
                
                {defibrilatorji.map(
                  defibrilator => (
                    <Marker 
                      key={defibrilator.opis} 
                      longitudegitude={defibrilator.longitude} 
                      latitudeitude={defibrilator.latitude} >

                        <button className="marker-btn" onClick={(e) => {
                          e.preventDefault();
                          setselectedDefibrilator(defibrilator);
                        }}>
                          <img src="marker.png" alt="Marker icon"/>
                        </button>

                    </Marker>
                  ))
                }

                {selectedDefibrilator ? (
                  <Popup 
                    latitudeitude={selectedDefibrilator.latitudei}
                    longitudegitude={selectedDefibrilator.longitude}
                    onClose={() => {
                      setselectedDefibrilator(null);
                    }}  
                  >
                    <div>
                      <h2>{selectedDefibrilator.opis}</h2>
                      <p>{selectedDefibrilator.delovni_cas}</p>
                    </div>
                  </Popup>
                ) : null}

            </ReactMapGL>
        </div>
        </div>
      );
}

export default Defibrilatorji
