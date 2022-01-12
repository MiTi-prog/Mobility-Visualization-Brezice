import React from 'react'
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import parking from "../data/parkirisca.js";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

function Parkirna() {
    let drawControl;
    

  const setupGeometries = (ref) => {
    drawControl = ref;
    parking.map((parkPlac) => {
        drawControl.draw.add(parkPlac); 
      
    });
  };

    const navControlStyle = {
        right: 50,
        top: 200
    };

    const fullscreenControlStyle= {
        right: 50,
        top: 150
    };

  return (
    <div>
        
      <Map
        style="mapbox://styles/mapbox/light-v10" // eslint-disable-line
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        zoom={[15.5]}
        center={[15.595651854337284, 45.90493389262271]}
      >
        <DrawControl ref={setupGeometries} />
      </Map>
    </div>
  );
}

export default Parkirna
