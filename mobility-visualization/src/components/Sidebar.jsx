import React from 'react'


//brežice modra -> #4472a1

function Sidebar() {
    return (
        <div className="w-full lg:-mt-96 lg:w-1/4 px-8 py-12 ml-auto rounded-md sidebar blur">
            <div className="flex flex-col text-white">
                <div className="divide-y-2 divide-green-500">
                    <div>
                        <h3 className="font-bold  text-1xl my-4 location-title">Osnovna šola Globoko</h3>
                        <p className="text-gray-400 location-description">- dostopni 24 ur</p>
                    </div> 
                </div>
                <div className="location-info">
                    <h3 className="font-bold  text-1xl my-4 location-title">Osnovna šola Globoko</h3>
                    <p className="text-gray-400 location-description">- dostopni 24 ur</p>
                </div>
                
            </div>
        </div>
    )
}

export default Sidebar
