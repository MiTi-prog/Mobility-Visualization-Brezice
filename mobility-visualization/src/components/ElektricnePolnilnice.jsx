import React from 'react'
import polnilnice from '../data/elektricne_polnilnice.json';
import Header from './Header';

function ElektricnePolnilnice() {
    return (
        <div className="">
            <Header />
            <header className="bg-white shadow">
                <div className="max-w-full mx-auto py-6">
                    <h1 className="text-3xl font-bold text-gray-900 px-4 sm:px-6 lg:px-8">Električne polnilnice</h1>
                </div>
            </header>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
                {
                    polnilnice.map (data => 
                        <div>
                            <span><b> Opis lokacije: </b>{data.opis}</span>
                            <span><b> Cena: </b>{data.cena}</span>
                            <span><b> Število vtičnic: </b>{data.vticnnicaSt}</span>
                            <span><b> Vrsta vtičnice: </b>{data.vrstaVticnice}</span>    
                            <span><b> Nazivna moč: </b>{data.nazivnaMoc}</span>    
                            <span><b> Naslov: </b>{data.naslov}</span>    
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ElektricnePolnilnice
