import React from 'react'
import Header from './Header';

function About() {
    return (
        <div className="about-section">
            <Header/>
            <div className="flex h-screen about">
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
        </div>
    )
}

export default About
