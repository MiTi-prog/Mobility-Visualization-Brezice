import React from 'react'
import izposojevalnice from '../data/izposojevalnice_koles.json';
import Header from './Header';

function IzposojevalniceKoles() {
    return (
        <div className="">
            <Header />
            <header className="bg-white shadow">
                <div className="max-w-full mx-auto py-6">
                    <h1 className="text-3xl font-bold text-gray-900 px-4 sm:px-6 lg:px-8">Izposojevalnica koles</h1>
                </div>
            </header>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
                {
                    izposojevalnice.map (data => 
                        <div>
                            <span><b> Lokacija izposojevalnice: </b>{data.lokacija}</span>
                            <span><b> Opis lokacije: </b>{data.opis_lokacije}</span>
                            <span><b> Število koles: </b>{data.izposojevalnica_stKoles}</span>
                            <span><b> Kolesarnica: </b>{data.kolesarnica}</span>
                            <span><b> Stojala za kolesa: </b>{data.stojala_za_kolesa}</span>    
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default IzposojevalniceKoles
