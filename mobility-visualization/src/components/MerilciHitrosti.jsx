import React, { useEffect, useState } from 'react'
import merilci from '../data/merilniki_hitrosti.json';
import Header from './Header';
import ReactMapGL, { 
  Marker, 
  Popup, 
  NavigationControl, 
  FullscreenControl,
  FlyToInterpolator 
} from 'react-map-gl';
 
ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';


function MerilciHitrosti() {
    const [long, SetLong] = useState(15.5545);
    const [lat, SetLat] = useState(45.90998);
    const [searchTerm, setSearchTerm] = useState('');

    const [viewport, setViewport] = React.useState({
        longitude: long,
        latitude: lat,
        center: [long, lat],
        zoom: 11.5
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

    const [selectedMerilc, setselectedMerilc] = useState(null);

    //[] - na koncu effecta tuki pove, da se ta akcija izvede samo 1x (enako kot componentDidMount())!
    useEffect(() => {
        const listener = e => {
          if (e.key === "Escape") { setselectedMerilc(null); }
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
                
                {merilci.filter((val) => {
                    if (searchTerm == '') {
                        return val;
                    }
                    else if (val.opis.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                }).map(
                  speed => (
                    <Marker 
                      key={speed.opis} 
                      longitude={speed.longitude} 
                      latitude={speed.latitude} >

                        <button className="marker-btn" onClick={(e) => {
                          e.preventDefault();
                          setselectedMerilc(speed);
                          
                          zoomToMarker(
                            speed.longitude,
                            speed.latitude,
                            [speed.longitude, speed.latitude]);
                        }}>

                          <img className="marker-icon" src="icons/cagr_modr.png" alt="Marker icon"/>
                        </button>

                    </Marker>
                  ))
                }

                {selectedMerilc ? (
                  <Popup 
                    latitude={selectedMerilc.latitude}
                    longitude={selectedMerilc.longitude}
                    onClose={() => {
                      setselectedMerilc(null);
                      zoomOfMarker(
                        selectedMerilc.longitude,
                        selectedMerilc.latitude,
                        [selectedMerilc.longitude, selectedMerilc.latitude]);
                    }}  
                  >
                    <div>
                      <h2><strong>{selectedMerilc.opis}</strong></h2>
                      <p>{selectedMerilc.naslov}</p>
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
                      <input type="text" placeholder="Poišči električno polnilnico..." className="text-gray-400 search rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2" onChange={event => {setSearchTerm(event.target.value)}}/>
                      {merilci.filter((val) => {
                          if (searchTerm == '') {
                              return val;
                          }
                          else if (val.opis.toLowerCase().includes(searchTerm.toLowerCase())) {
                              return val;
                          }
                      }).map((sped) => (
                      <div className="defibrilator-info text-white" key={sped.longitude}>
                          <h3 className="title font-bold text-1xl my-4 location-title">{sped.opis}</h3>
                          <p className="description text-gray-400 location-description">
                            Proizvajalec: {sped.proizvajalec}
                          </p>
                          <p className="description text-gray-400 location-description">
                            Longitude: {sped.longitude}
                          </p>
                          <p className="description text-gray-400 location-description">
                            latitude: {sped.latitude}
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
export default MerilciHitrosti;