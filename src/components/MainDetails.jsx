import React from 'react'

const MainDetails = ({ name, address }) => {
    return (
        <>
            <div className='flex flex-col items-end justify-end'>
                <h2 className='font-bold text-xl uppercase md:text-2xl'>{name}</h2>
                <p>{address}</p>
            </div>
        </>
    )
}

export default MainDetails