import React, { useEffect, useState } from 'react'
import polnilnice from '../data/elektricne_polnilnice.json';
import Header from './Header';
import ReactMapGL, { 
  Marker, 
  Popup, 
  NavigationControl, 
  FlyToInterpolator 
} from 'react-map-gl';
 
ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';

function ElektricnePolnilnice() {
    const [long, SetLong] = useState(15.5965);
    const [lat, SetLat] = useState(45.9088);
    //const [center, setCenter] = useState([long, lat]);

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

    const zoomToMarker = (lo,la,cent) => {
      setViewport({
        ...viewport, 
        longitude: lo, 
        latitude: la, 
        center: cent, 
        zoom: 15,
        transitionDuration: 1500,
        transitionInterpolator: new FlyToInterpolator()
      });
    };

    const zoomOfMarker = (lo,la,cent) => {
      setViewport({
        ...viewport, 
        longitude: lo, 
        latitude: la, 
        center: cent, 
        zoom: 11,
        transitionDuration: 1500,
        transitionInterpolator: new FlyToInterpolator()
      });
    };

    const [selectedCharger, setselectedCharger] = useState(null);
    
    //[] - na koncu effecta tuki pove, da se ta akcija izvede samo 1x (enako kot componentDidMount())!
    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") { setselectedCharger(null); }
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
                
                {polnilnice.map(
                  charger => (
                    <Marker 
                      key={charger.opis} 
                      longitude={charger.longitude} 
                      latitude={charger.latitude} >

                        <button className="marker-btn" onClick={(e) => {
                          e.preventDefault();
                          setselectedCharger(charger);
                          
                          zoomToMarker(
                            charger.longitude,
                            charger.latitude,
                            [charger.longitude, charger.latitude]);
                        }}>

                          <img className="marker-icon" src="icons/polnilnica-icon.png" alt="Marker icon"/>
                        </button>

                    </Marker>
                  ))
                }

                {selectedCharger ? (
                  <Popup 
                    latitude={selectedCharger.latitude}
                    longitude={selectedCharger.longitude}
                    onClose={() => {
                      setselectedCharger(null);
                      zoomOfMarker(
                        selectedCharger.longitude,
                        selectedCharger.latitude,
                        [selectedCharger.longitude, selectedCharger.latitude]);
                    }}  
                  >
                    <div>
                      <h2><strong>{selectedCharger.opis}</strong></h2>
                      <p>{selectedCharger.naslov}</p>
                    </div>
                  </Popup>
                ) : null}
                <NavigationControl style={navControlStyle} />
            </ReactMapGL>
        </div>
        </div>
      );
}

export default ElektricnePolnilnice
