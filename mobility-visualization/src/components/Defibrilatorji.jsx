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


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

function Defibrilatorji() {
    const [long, SetLong] = useState(15.5765);
    const [lat, SetLat] = useState(45.92998);
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
    };*/

    // const myRef = useRef(null);
    // const executeScroll = () => scrollToRef(myRef);


    const ref = useRef(null);
    const addClass = () => {
      const span = ref.current;
      span.className = 'focused';
      console.log('marker enabled');
    };
    
    const removeClass = () => {
      const span = ref.current;
      span.className = '';
      console.log('marker disabled');
    };

    // const scroll = () => {
    //   document.getElementsByClassName('focused').scroll(0,0);
    // }
    
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
                  
                  {defibrilatorji.filter((val) => {
                      if (searchTerm == '') {
                          return val;
                      }
                      else if (val.opis.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return val;
                      }
                  }).map(
                    defibrilator => (
                      <Marker
                        key={defibrilator.opis} 
                        longitude={defibrilator.longitude} 
                        latitude={defibrilator.latitude} >

                          <button className="marker-btn" onClick={(e) => {
                            e.preventDefault();
                            setselectedDefibrilator(defibrilator);
                            addClass();
                            //scrollToSection();
                            // executeScroll();
                            //scroll();
                            
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
                  <div className="flex flex-col ">
                      {/* SearchBar */}
                      <input type="text" placeholder="Poišči defibrilator..." className="text-gray-400 search rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2" onChange={event => {setSearchTerm(event.target.value)}}/>
                      {defibrilatorji.filter((val) => {
                          if (searchTerm == '') {
                          return val;
                      }
                          else if (val.opis.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return val;
                      }
                      }).map((def) => (
                      <div ref={ref} className="" key={def.longitude}>
                        {/*ref={myRef} spodaj v div  ref={ (ref) => myRef=ref}*/}
                        <div className="defibrilator-info text-white" >
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
