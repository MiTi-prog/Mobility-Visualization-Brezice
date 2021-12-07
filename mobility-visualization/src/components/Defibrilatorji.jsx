import React, { useEffect, useState, useRef } from 'react';
import { scroller } from 'react-scroll';
import defibrilatorji from '../data/lokacije_defibrilatorjev.json';
import Header from './Header';
import ReactMapGL, {
  Marker,
  Popup, 
  NavigationControl,
  FullscreenControl,
  FlyToInterpolator
} from 'react-map-gl';
 
ReactMapGL.accessToken = 'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw';

function Defibrilatorji() {
    const [long, SetLong] = useState(15.5965);
    const [lat, SetLat] = useState(45.9088);
    
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
        zoom: 16,
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

    /*const scrollToSection = () => {
      scroller.scrollTo('focused', {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    };
    const myRef = useRef(null);
    const executeScroll = () => myRef.scrollIntoView();*/


    const ref = useRef(null);
    const addClass = () => {
      const span = ref.current;
      span.className = 'focused';
      console.log('marker enabled')
    };
    
    const removeClass = () => {
      const span = ref.current;
      span.className = '';
      console.log('marker disabled')
    };
    
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
                  height="100vh" 
                  mapStyle="mapbox://styles/mapbox/light-v10"
                  onViewportChange={setViewport}
                  mapboxApiAccessToken={'pk.eyJ1IjoibWl0aTIxIiwiYSI6ImNrdzNoamxwdTFka2syb3JvdWRhM3EwNW8ifQ.OV5IlhtvWXgW2SwJbi_xYw'}
                  >
                  
                  {defibrilatorji.map(
                    defibrilator => (
                      <Marker 
                        key={defibrilator.opis} 
                        longitude={defibrilator.longitude} 
                        latitude={defibrilator.latitude} >

                          <button className="marker-btn" onClick={(e) => {
                            e.preventDefault();
                            setselectedDefibrilator(defibrilator);
                            addClass();
                            //executeScroll();
                            
                            zoomToMarker(
                              defibrilator.longitude,
                              defibrilator.latitude,
                              [defibrilator.longitude, defibrilator.latitude]);
                          }}>
                            <img src="icons/aed_zelen.png" alt="Marker icon"/>
                          </button>

                      </Marker>
                    ))
                  }

                  {selectedDefibrilator ? (
                    <Popup 
                      latitude={selectedDefibrilator.latitude}
                      longitude={selectedDefibrilator.longitude}
                      onClose={() => {
                        setselectedDefibrilator(null);
                        removeClass();
                        zoomOfMarker(
                          selectedDefibrilator.longitude,
                          selectedDefibrilator.latitude,
                          [selectedDefibrilator.longitude, selectedDefibrilator.latitude]);
                      }}  
                    >
                      
                      <div>
                        <span>
                          <h2><strong>{selectedDefibrilator.opis}</strong></h2>
                          <p>- {selectedDefibrilator.delovni_cas}</p>
                        </span>
                      </div>
                    </Popup>
                  ) : null}
                <NavigationControl style={navControlStyle} />
                <FullscreenControl style={fullscreenControlStyle} />
              </ReactMapGL>

              {/* Sidebar */}
              <div className="w-full h-3/4 lg:-mt-96 lg:w-1/4 px-8 py-5 ml-auto rounded-md sidebar blur">
                  <div className="flex flex-col text-white">
                    {defibrilatorji.map((def) => (
                      <div ref={ref} className="" key={def.longitude}>
                        {/*ref={ (ref) => this.myRef=ref spodaj v div*/}
                        <div >
                          <h3 className="title font-bold text-1xl my-4 location-title">{def.opis}</h3>
                          <p className="description text-gray-400 location-description">Dostopnost: {def.delovni_cas}
                            {/*<FontAwesomeIcon icon="coffee" /> */}
                          </p>
                        </div>  
                      </div>
                    ))
                    }
                  </div>
              </div>
          </div>
        </div>
      );
}

export default Defibrilatorji
