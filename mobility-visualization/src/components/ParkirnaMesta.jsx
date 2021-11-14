import React from 'react'
import parkirisca from '../data/lokacije_parkirnih_mest.json';

function ParkirnaMesta() {

    return (
        <div className="">
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
    );

}

export default ParkirnaMesta
