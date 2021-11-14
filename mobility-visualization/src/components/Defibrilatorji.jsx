import React from 'react'
import defibrilatorji from '../data/lokacije_defibrilatorjev.json';

function Defibrilatorji() {
    return (
        <div className="">
            <header className="bg-white shadow">
                <div className="max-w-full mx-auto py-6">
                    <h1 className="text-3xl font-bold text-gray-900 px-4 sm:px-6 lg:px-8">Defibrilatorji</h1>
                </div>
            </header>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
                {
                    defibrilatorji.map (data => 
                        <div>
                            <span><b> Opis lokacije: </b>{data.opis}</span>
                            <span><b> Delovni čas: </b>{data.delovni_cas}</span>
                            <span><b> Longitude: </b>{data.longitude}</span>
                            <span><b> Latitude: </b>{data.latitude}</span>    
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Defibrilatorji
