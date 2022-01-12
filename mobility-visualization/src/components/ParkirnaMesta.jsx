import React, { useEffect, useState, useRef } from 'react';
import parkirisca from '../data/lokacije_parkirnih_mest.json';
import Header from './Header';
import Parkirna from './Parkirna';
import ReactMapGL, {
     Marker, 
     Popup, 
     NavigationControl, 
     FlyToInterpolator, 
     FullscreenControl,
     GeoJSONLayer 
} from 'react-map-gl';
import { useHistory } from 'react-router-dom';

ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';


function ParkirnaMesta() {
    const history = useHistory();
    const [long, SetLong] = useState(15.594459);
    const [lat, SetLat] = useState(45.9047747);
    //const [center, setCenter] = useState([long, lat]);
    const [searchTerm, setSearchTerm] = useState('');

    const [viewport, setViewport] = React.useState({
        longitude: long,
        latitude: lat,
        center: [long, lat],
        zoom: 15
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
        zoom: 18,
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
        zoom: 15,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator()
      });
    };

    const [selectedPark, setSelectedPark] = useState(null);
    
    //[] - na koncu effecta tuki pove, da se ta akcija izvede samo 1x (enako kot componentDidMount())!
    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") { setSelectedPark(null); }
      };
      window.addEventListener("keydown", listener)
    }, []);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    const [isMarker, setIsMarker] = useState(true);
    const [isDraw, setIsDraw] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    return(
        <div className=''>
        <Header />
        <div className="w-full h-full">
            <div className='izris'>
                {isDraw && <Parkirna />}
            </div>
            <div className='izris-markers'>
                {isMarker && 
                <ReactMapGL 
                    {...viewport}
                    width="100vw" 
                    height="100vh" 
                    mapStyle="mapbox://styles/mapbox/light-v10"
                    onViewportChange={setViewport}
                    mapboxApiAccessToken={'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw'}
                >
                    
                    {parkirisca.filter((val) => {
                        if (searchTerm == '') {
                            return val;
                        }
                        else if (val.lokacija_parkirisca.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                        else if (val.opis_lokacije.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                    }).map(
                    park => (
                        <Marker 
                        key={park.lokacija_parkirisca} 
                        longitude={park.LON} 
                        latitude={park.LAT} >

                            <button className="marker-btn" onClick={(e) => {
                            e.preventDefault();
                            setSelectedPark(park);
                            
                            zoomToMarker(
                                park.LON,
                                park.LAT,
                                [park.LON, park.LAT]);
                            }}>

                            <img className="marker-icon" src="icons/parking.png" alt="Marker icon"/>
                            </button>

                        </Marker>
                    ))
                    }

                    {selectedPark? (
                    <Popup 
                        latitude={selectedPark.LAT}
                        longitude={selectedPark.LON}
                        onClose={() => {
                        setSelectedPark(null);
                        zoomOfMarker(
                            selectedPark.LON,
                            selectedPark.LAT,
                            [selectedPark.LON, selectedPark.LAT]);
                        }}  
                    >
                        <div>
                        <h2><strong>{selectedPark.lokacija_parkirisca}</strong></h2>
                        <p>{selectedPark.opis_lokacije}</p>
                        </div>
                    </Popup>
                    ) : null}
                    <NavigationControl style={navControlStyle} />
                    <FullscreenControl style={fullscreenControlStyle} />
                </ReactMapGL>}
            </div>
            {/* Sidebar */}
            <div className="w-full h-3/4 lg:-mt-96 lg:w-1/4 px-8 py-5 ml-auto rounded-md sidebar blur">
                  <div className="flex flex-col">
                      {/* SearchBar */}
                      {isMarker && 
                        <input type="text" placeholder="Poišči električno polnilnico..." className="text-gray-400 search rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2" onChange={event => {setSearchTerm(event.target.value)}}/>
                      }               
                      <div className='showParkings'>
                        <input 
                            type="checkbox" 
                            id="topping" 
                            name="topping" 
                            value="Parkings"  
                            checked={isChecked}
                            onChange={(e) => {
                                if (isChecked) {
                                    //history.push('/');
                                    window.location = '/';
                                }
                                handleOnChange();
                                setIsDraw(!isDraw);
                                setIsMarker(!isMarker);
                            }}
                        /> Pokaži izris parkirišč
                      </div>
                      {parkirisca.filter((val) => {
                        if (searchTerm == '') {
                            return val;
                        }
                        else if (val.lokacija_parkirisca.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                        else if (val.opis_lokacije.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                    }).map((park) => (
                      <div className="defibrilator-info  text-white" key={park.LON}>
                          <h3 className="title font-bold text-1xl my-4 location-title">{park.opis_lokacije}</h3>
                          <p className="description text-gray-400 location-description">
                            Naslov: {park.lokacija_parkirisca}
                          </p>
                          <p className="description text-gray-400 location-description">
                            GPS: {park.gps_parkirisca}
                          </p>
                          <p className="description text-gray-400 location-description">
                            Parkirni prostori: {park.parkirni_prostori}
                          </p>
                          <p className="description text-gray-400 location-description">
                            Parkirni prostori za invalide: {park.parkirni_prostori_za_invalide}
                          </p>
                          <p className="description text-gray-400 location-description">
                            {/*<FontAwesomeIcon icon="coffee" />*/}Parkirni režim: {park.parkrini_rezim}
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

export default ParkirnaMesta
