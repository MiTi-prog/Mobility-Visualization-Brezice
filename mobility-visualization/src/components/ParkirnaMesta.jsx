import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parkirisca from '../data/lokacije_parkirnih_mest.json';
import Header from './Header';
import ReactMapGL, {
     Marker, 
     Popup, 
     NavigationControl, 
     FlyToInterpolator, 
     FullscreenControl,
     GeoJSONLayer 
} from 'react-map-gl';

import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';


function ParkirnaMesta() {
   {/*
    onDrawCreate = ({ features }) => {
        console.log(features);
    };
    
    onDrawUpdate = ({ features }) => {
        console.log({ features });
    };
    */}

    {/*
    const geojson = {
        type: "FeatureCollection",
        features: [
        {
            type: "Feature",
            properties: {
            text: "Fort Greene"
        },
        geometry: {
            type: "Polygon",
            coordinates: [
                [
                [-73.97777080535889, 40.69336192556367],
                [-73.97704124450682, 40.68986390865585],
                [-73.97315740585327, 40.68970120572578],
                [-73.97388696670532, 40.69323177008439],
                [-73.97777080535889, 40.69336192556367],
                ]
            ]
        }
        }
        ]
    };
    
    const geojsonStyles = {
        lineLayout: {
            "line-join": "round",
            "line-cap": "round"
        },
        linePaint: {
            "line-color": "#ff11ff",
            "line-width": 4,
            "line-opacity": 1
        },
        symbolLayout: {
            "text-field": "{text}",
            "symbol-placement": "line",
            "text-rotation-alignment": "map",
            "text-size": {
              base: 1,
              stops: [[9, 9], [14, 12]]
            }
        },
        symbolPaint: {
            "text-color": "rgba(0, 0, 0, 1)",
            "text-halo-color": "rgba(255, 255, 255, 1)",
            "text-halo-width": 2
        }
    };

    */}
    
    const [long, SetLong] = useState(15.595459);
    const [lat, SetLat] = useState(45.9057747);
    //const [center, setCenter] = useState([long, lat]);

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
        zoom: 17,
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


    {/*
    return (
        <div className="App">
            <ReactMapGL
                style="mapbox://styles/mapbox/light-v10" // eslint-disable-line
                containerStyle={{
                    height: "100vh",
                    width: "100vw"
                }}
                zoom={[16]}
                center={[-73.9757752418518, 40.69144210646147]}
            >
               {/* <DrawControl
                    position="top-left"
                    onDrawCreate={this.onDrawCreate}
                    onDrawUpdate={this.onDrawUpdate}
                />
                {/*<GeoJSONLayer {...geojsonStyles} data={geojson} />
                }
            </ReactMapGL>
        </div>
    );

    */}

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
                
                {parkirisca.map(
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
            </ReactMapGL>
            {/* Sidebar */}
            <div className="w-full h-3/4 lg:-mt-96 lg:w-1/4 px-8 py-5 ml-auto rounded-md sidebar blur">
                  <div className="flex flex-col text-white">
                    {parkirisca.map((park) => (
                      <div className="defibrilator-info" key={park.LON}>
                          <h3 className="title font-bold text-1xl my-4 location-title">{park.opis_lokacije}</h3>
                          <p className="description text-gray-400 location-description">
                            <FontAwesomeIcon icon="coffee" />Naslov: {park.lokacija_parkirisca}
                          </p>
                          <p className="description text-gray-400 location-description">
                            <FontAwesomeIcon icon="coffee" />GPS: {park.gps_parkirisca}
                          </p>
                          <p className="description text-gray-400 location-description">
                            <FontAwesomeIcon icon="coffee" />Parkirni prostori: {park.parkirni_prostori}
                          </p>
                          <p className="description text-gray-400 location-description">
                            <FontAwesomeIcon icon="coffee" />Parkirni prostori za invalide: {park.parkirni_prostori_za_invalide}
                          </p>
                          <p className="description text-gray-400 location-description">
                            <FontAwesomeIcon icon="coffee" />Parkirni režim: {park.parkrini_rezim}
                          </p>
                      </div>
                    ))
                    }
                  </div>
            </div>
        </div>
        </div>
        );
    
        {/*
        <div className="">
            <Header />
            <header className="bg-white shadow">
                <div className="max-w-full mx-auto py-6">
                    <h1 className="text-3xl font-bold text-gray-900 px-4 sm:px-6 lg:px-8">Parkirna mesta</h1>
                </div>
            </header>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
                {
                    parkirisca.map (data => 
                        <div>
                            <span><b>Lokacija parkirišča: </b>{data.lokacija_parkirisca}</span>
                            <span><b> Opis lokacije: </b>{data.opis_lokacije}</span>
                            <span><b> Parkirni prostori: </b>{data.parkirni_prostori}</span>
                            <span><b> Parkirni prostori za invalide: </b>{data.parkirni_prostori_za_invalide}</span>
                            <span><b> Parkirni režim: </b>{data.parkrini_rezim}</span>    
                        </div>
                    )
                }
            </div>
        </div>
            );*/}
}

export default ParkirnaMesta
