import React, { useEffect, useState } from 'react';
import kolesa from '../data/izposojevalnice_koles.json';
import Header from './Header';
import ReactMapGL, { 
  Marker, 
  Popup, 
  NavigationControl, 
  FullscreenControl,
  FlyToInterpolator 
} from 'react-map-gl'; 

ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';

function IzposojevalniceKoles() {
    const [long, SetLong] = useState(15.5895);
    const [lat, SetLat] = useState(45.91122);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [viewport, setViewport] = React.useState({
        longitude: long,
        latitude: lat,
        center: [long, lat],
        zoom: 13.5
    });
    const navControlStyle= {
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
        zoom: 13,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator()
      });
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
                
                {kolesa.filter((val) => {
                    if (searchTerm == '') {
                        return val;
                    }
                    else if (val.lokacija.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                    else if (val.opis_lokacije.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                }).map(
                  kolo => (
                    <Marker 
                      key={kolo.opis_lokacije} 
                      longitude={kolo.LON} 
                      latitude={kolo.LAT} 
                    >
                        <button className="marker-btn" onClick={(e) => {
                          e.preventDefault();
                          setSelectedBike(kolo);
                          zoomToMarker(
                            kolo.LON,
                            kolo.LAT,
                            [kolo.LON, kolo.LAT]);
                        }}>
                          <img src="icons/bicikl.png" alt="Marker icon"/>
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
                      zoomOfMarker(
                        selectedBike.LON,
                        selectedBike.LAT,
                        [selectedBike.LON, selectedBike.LAT]);
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
            {/* Sidebar */}
            <div className="w-full h-3/4 lg:-mt-96 lg:w-1/4 px-8 py-5 ml-auto rounded-md sidebar blur">
                  <div className="flex flex-col">
                      {/* SearchBar */}
                      <input type="text" placeholder="Poi????i izposojevalnico koles..." className="text-gray-400 search rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2" onChange={event => {setSearchTerm(event.target.value)}}/>
                      {kolesa.filter((val) => {
                          if (searchTerm == '') {
                              return val;
                          }
                          else if (val.lokacija.toLowerCase().includes(searchTerm.toLowerCase())) {
                              return val;
                          }
                          else if (val.opis_lokacije.toLowerCase().includes(searchTerm.toLowerCase())) {
                              return val;
                          }
                      }).map((bike) => (
                      <div className="defibrilator-info text-white" key={bike.LON}>
                          <h3 className="title font-bold text-1xl my-4 location-title">{bike.opis_lokacije}</h3>
                          <p className="description text-gray-400 location-description">
                           Naslov: {bike.lokacija}
                          </p>
                          <p className="description text-gray-400 location-description">
                            ??t. koles: {bike.izposojevalnica_stKoles}
                          </p>
                          <p className="description text-gray-400 location-description">
                            {/*<FontAwesomeIcon icon="coffee" />*/}GPS kolesarnice: {bike.gps_kolesarnice}
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
export default IzposojevalniceKoles