import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const TableForm = ({ description, setDescription, amount, setAmount, price, setPrice, quantity, setQuantity, list, setList, total, setTotal }) => {

    const [isEdit, setIsEdit] = useState(false)

    const calculateAmount = (amount) => {
        setAmount(quantity * price)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItems = {
            id: uuidv4(),
            description,
            amount,
            price,
            quantity
        }
        setDescription("")
        setQuantity("")
        setPrice("")
        setAmount("")
        setList([...list, newItems])
        setIsEdit(false)
    }

    // Edit function
    const editRow = (id) => {
        const editingRow = list.find((item) => item.id === id)
        setList(list.filter(item => item.id !== id))
        setIsEdit(true)
        setDescription(editingRow.description)
        setQuantity(editingRow.quantity)
        setPrice(editingRow.price)
    }

    // Delete function
    const deleteRow = (id) => {
        setList(list.filter(item => item.id !== id))
    }

    useEffect(() => {
        calculateAmount(amount)
    }, [price, quantity])

    useEffect(() => {
        // calculate total amount of items
        let rows = document.querySelectorAll(".amount")
        let sum = 0
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].className === 'amount') {
                sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML)
                setTotal(sum)
            }

        }
    })

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col md:mt-16'>
                    <label htmlFor="description">Item description</label>
                    <input type="text" name='description' id='description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                </div>

                <div className='md:grid grid-cols-3 gap-10'>
                    <div className='flex flex-col'>
                        <label htmlFor="quantity">Quantity</label>
                        <input type="text" name='quantity' id='quantity' value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="price">Price</label>
                        <input type="text" name='price' id='price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="amount">Item amount</label>
                        <p id='amount'>{amount}</p>
                    </div>
                </div>
                <button className='bg-blue-500 mb-5 text-white py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300' type='submit'>{isEdit ? "Editing row item" : "Add table item"}</button>
            </form>
            {/* Table Items */}
            <table width='100%' className='mb-10'>
                <thead>
                    <tr className='bg-gray-100'>
                        <td className='font-bold'>Description</td>
                        <td className='font-bold'>Quantity</td>
                        <td className='font-bold'>Price</td>
                        <td className='font-bold'>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item) => (
                        <tr key={item.id}>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td className='amount'>{item.amount}</td>
                            <td><MdDeleteOutline className='text-red-500 font-bold text-xl cursor-pointer' onClick={() => { deleteRow(item.id) }} /></td>
                            <td><CiEdit className='text-green-500 font-bold text-xl cursor-pointer' onClick={() => { editRow(item.id) }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2 className='flex items-end justify-end text-gray-800 text-2xl font-bold mb-10'>Kshs. {total.toLocaleString()}</h2>
            </div>
        </>
    )
}

export default TableForm