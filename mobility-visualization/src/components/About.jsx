import React, { useState } from 'react'
import Header from './Header';
import ReactMapGL from 'react-map-gl';

ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw'

function About() {;
    const [long, SetLong] = useState(15.5965);
    const [lat, SetLat] = useState(45.9088);
    
    const [viewport, setViewport] = React.useState({
        longitude: long,
        latitude: lat,
        center: [long, lat],
        zoom: 11
    });
    return (
        
        <div className="about-section">
            <Header/>
            
            
            <ReactMapGL 
                className="about-map"
                {...viewport}
                width="100vw" 
                height="100vh" 
                mapStyle="mapbox://styles/mapbox/light-v10"
                onViewportChange={setViewport}
                mapboxApiAccessToken={'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw'}
                >

                <div className="about object-center">
                    <div className="m-auto">
                        <div className="authors rounded-md p-8">
                            <h2 className="text-white text-xl">Avtorja projekta: Timotej Tim Rus in Mitja Šepec</h2>
                            <h4 className="text-white text-lg mt-5">Namen projekta:</h4>
                            <p className="text-gray-400 text-md text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            <br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            <br/>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
            </ReactMapGL>
            
        </div>
    )
}

export default About
