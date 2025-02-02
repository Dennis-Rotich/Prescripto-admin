import React from 'react'

const Notes = ({notes}) => {
    return (
        <>
            <div className='mb-5'>
                {/* Textarea */}
                <p className='lg:w-1/2 text-justify'>{notes}</p>
            </div>
        </>
    )
}

export default Notes