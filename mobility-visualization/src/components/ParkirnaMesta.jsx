import React from 'react'
import parkirisca from '../data/lokacije_parkirnih_mest.json';
import Header from './Header';
import ReactMapGL, { Marker, Popup, NavigationControl, FlyToInterpolator, GeoJSONLayer } from 'react-map-gl';
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';


function ParkirnaMesta() {
    /*
    onDrawCreate = ({ features }) => {
        console.log(features);
    };
    
    onDrawUpdate = ({ features }) => {
        console.log({ features });
    };
    */
    
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
                <DrawControl
                    position="top-left"
                    onDrawCreate={this.onDrawCreate}
                    onDrawUpdate={this.onDrawUpdate}
                />
                {/*<GeoJSONLayer {...geojsonStyles} data={geojson} />
                */}
            </ReactMapGL>
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
