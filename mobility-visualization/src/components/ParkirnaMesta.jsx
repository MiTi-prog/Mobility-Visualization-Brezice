import React from 'react'
import data from '../data/lokacije_parkirnih_mest.json';

function ParkirnaMesta() {

const newData = data.map((data) => {
    return (
        <div className="">
            <h2>Prebrani podatki o parkiriščih:</h2>
            <span><b>Lokacija parkirišča: </b>{data.lokacija_parkirisca}</span>
            <span><b>Opis lokacije: </b>{data.opis_lokacije}</span>
            <span><b>Parkirni prostori: </b>{data.parkirni_prostori}</span>
            <span><b>Parkirni prostori za invalide: </b>{data.parkirni_prostori_za_invalide}</span>
            <span><b>Parkirni režim: </b>{data.parkrini_rezim}</span>
        </div>
    )
});

return (
    <div>
        {newData}
    </div>
)
    
}

export default ParkirnaMesta
