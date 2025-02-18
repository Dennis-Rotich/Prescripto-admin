import React from 'react'

const Table = ({list, total}) => {
    return (
        <>
            <table width='100%'>
                <thead>
                    <tr className='bg-gray-100'>
                        <td className='font-bold'>Description</td>
                        <td className='font-bold'>Quantity</td>
                        <td className='font-bold'>Price</td>
                        <td className='font-bold'>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index)=>(
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2 className='flex items-end justify-end text-gray-800 text-2xl font-bold my-10'>Kshs. {total.toLocaleString()}</h2>
            </div>
        </>
    )
}

export default Table