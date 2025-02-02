import React from 'react'

const ClientDetails = ({ clientName, clientAddress }) => {
    return (
        <>
            <div className='mt-5'>
                <h2 className='text-xl uppercase'>{clientName}</h2>
                <p>{clientAddress}</p>
            </div>
        </>
    )
}

export default ClientDetails