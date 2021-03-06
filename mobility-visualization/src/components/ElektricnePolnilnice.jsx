import React, { useEffect, useState } from 'react'
import polnilnice from '../data/elektricne_polnilnice.json';
import Header from './Header';
import ReactMapGL, { 
  Marker, 
  Popup, 
  NavigationControl, 
  FullscreenControl,
  FlyToInterpolator 
} from 'react-map-gl';
 
ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';

function ElektricnePolnilnice() {
    const [long, SetLong] = useState(15.5865);
    const [lat, SetLat] = useState(45.9299);
    //const [center, setCenter] = useState([long, lat]);

    const [searchTerm, setSearchTerm] = useState('');

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

    const fullscreenControlStyle= {
      right: 50,
      top: 150
    };

    const zoomToMarker = (lo,la,cent) => {
      setViewport({
        ...viewport, 
        longitude: lo, 
        latitude: la, 
        center: cent, 
        zoom: 15,
        transitionDuration: 1000,
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
        transitionDuration: 1000,
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
                
                {polnilnice.filter((val) => {
                    if (searchTerm == '') {
                        return val;
                    }
                    else if (val.naslov.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                    else if (val.opis.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                }).map(
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
                          <img className="marker-icon" src="icons/charger_blue.png" alt="Marker icon"/>
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
                <FullscreenControl style={fullscreenControlStyle} />
            </ReactMapGL>



            {/* Sidebar */}
            <div className="w-full h-3/4 lg:-mt-96 lg:w-1/4 px-8 py-5 ml-auto rounded-md sidebar blur">
                  <div className="flex flex-col">
                      {/* SearchBar */}
                    <input type="text" placeholder="Poi????i elektri??no polnilnico..." className="text-gray-400 search rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2" onChange={event => {setSearchTerm(event.target.value)}}/>
                    {polnilnice.filter((val) => {
                        if (searchTerm == '') {
                            return val;
                        }
                        else if (val.naslov.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                        else if (val.opis.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                    }).map((charg) => (
                      <div className="defibrilator-info text-white" key={charg.longitude}>
                          <h3 className="title font-bold text-1xl my-4 location-title">
                              {charg.opis}
                          </h3>
                          <p className="description text-gray-400 location-description">
                            Naslov: {charg.naslov}
                          </p>
                          <p className="description text-gray-400 location-description">
                            ??t. vti??nic: {charg.vticnnicaSt}
                          </p>
                          <p className="description text-gray-400 location-description">
                            Vrsta Vti??nike: {charg.vrstaVticnice}
                          </p>
                          <p className="description text-gray-400 location-description">
                            Nazivna mo??: {charg.nazivnaMoc}
                          </p>
                          <p className="description text-gray-400 location-description">
                            {/*<FontAwesomeIcon icon="coffee" />*/}Cena: {charg.cena}
                          </p>
                      </div>
                    ))
                    }
                  </div>
            </div>
        </div>
        </div>
      );
}

export default ElektricnePolnilnice
