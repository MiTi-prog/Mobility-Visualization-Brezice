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
                            <p className="description text-md text-justify">
                                Ideja za projekt je nastala pri predmetu multimedijske tehnologije na Fakulteti za računalništvo in informatiko Ljubljana. Pri predmetu smo morali izdelati aplikacijo zvizualizacijo <br/> 
                                s pomočjo odprtokodnih podatki iz portala OPSI. Ker za najino domačo občino (občino Brežice), še ni bilo plaforme, ki bi prikazovala vse podatko mobilnosti na enem mestu,<br/>
                                sva se odločila za izdelavo spletne aplikacije z viualizacijo podatkov o mobilnosti. <br /> <br /> Vizualizirala sva naslednje primere: 
                                parkirna mesta, izposojevalnice koles, električne polnilnice, merilce hitrosti ter dodala še podatke o defibrilatorjih. <br/>
                                Nekaj podatkov sva dopolnila s pomočjo različnih orodij (aplikacije PlugShare, google Earth, merilce hitrosti pa sva morala ročno pridobiti iz zemljevida proizvajalcev in občine). <br/>
                                Podatke sva predstavila na moderen ininteraktiven način, prijazen uporabnikom. Sedaj bo lahko vsak, ki bo te podatke potreboval, našel vse na enem mestu in bo tako  informiran <br/> o sami Občini Brežice in tem kar ponuja z vidika mobilnosti. <br/> 
                            </p>

                            <h4 className="text-white text-lg mt-5">Kontakt:</h4>
                            <ul className="description ">
                                <li className="contact hover:text-black">
                                    <a href="mailto:tr0339@student.uni-lj.si">tr0339@student.uni-lj.si</a><br/>                          
                                </li>
                                <li className="contact hover:text-black">
                                    <a href="mailto:ms3519@student.uni-lj.si">ms3519@student.uni-lj.si</a>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </ReactMapGL>
            
        </div>
    )
}

export default About
