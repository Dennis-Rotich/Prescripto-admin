import React, { useState, useRef } from 'react'
import InvoiceHeader from '../../components/InvoiceHeader'
import MainDetails from '../../components/MainDetails'
import ClientDetails from '../../components/ClientDetails'
import Dates from '../../components/Dates'
import Table from '../../components/Table'
import Notes from '../../components/Notes'
import InvoiceFooter from '../../components/InvoiceFooter'
import TableForm from '../../components/TableForm'
import { useReactToPrint } from "react-to-print";

const Invoice = () => {

    const [showInvoice, setShowInvoice] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [bankName, setBankName] = useState("")
    const [bankAccount, setBankAccount] = useState("")
    const [website, setWebsite] = useState("")
    const [clientName, setClientName] = useState("")
    const [clientAddress, setClientAddress] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [notes, setNotes] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    
    const componentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ content: ()=> componentRef.current });

    return (
        <main id='section-to-print' className='w-full p-5 bg-white m-5 md:mx-auto md:max-w-xl lg:max-w-2xl xl:max-w-4xl xl:mx-auto'>
            
            {
                showInvoice ? 
                <>
                <button onClick={reactToPrintFn}>Print</button>
                <div ref={componentRef}>
                    <InvoiceHeader />

                    <MainDetails name={name} address={address} />

                    <ClientDetails clientName={clientName} clientAddress={clientAddress} />

                    <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate} />

                    <Table list={list} total={total} setTotal={setTotal}/>

                    <Notes notes={notes} />

                    <InvoiceFooter name={name} address={address} email={email} website={website} phone={phone} bankAccount={bankAccount} bankName={bankName} />

                    <button onClick={() => { setShowInvoice(false) }} className='bg-blue-500 mt-5 text-white py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300'>Edit Information</button>
                </div>
                </> : <>
                    <div className='flex flex-col justify-center'>
                        <article className='md:grid grid-cols-2 gap-10'>
                            <div className='flex flex-col'>
                                <label htmlFor="name">Enter your full name</label>
                                <input type="text" name='text' id='name' placeholder='Enter your name' value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="address">Enter your address</label>
                                <input type="text" name='text' id='address' placeholder='Enter your address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                            </div>
                        </article>

                        <article className='md:grid grid-cols-3 gap-10'>
                            <div className='flex flex-col'>
                                <label htmlFor="email">Enter your email</label>
                                <input type="text" name='text' id='email' placeholder='Enter your email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="website">Enter your website</label>
                                <input type="url" name='text' id='website' placeholder='Enter your website' value={website} onChange={(e) => { setWebsite(e.target.value) }} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="phone">Enter your phone no</label>
                                <input type="text" name='text' id='phone' placeholder='Enter your phone no' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                            </div>
                        </article>

                        <article className='md:grid grid-cols-2 gap-10'>
                            <div className='flex flex-col'>
                                <label htmlFor="bankName">Enter your bank name</label>
                                <input type="text" name='text' id='bankName' placeholder='Enter your bank name' value={bankName} onChange={(e) => { setBankName(e.target.value) }} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="bankAccount">Enter your bank account</label>
                                <input type="text" name='text' id='bankAccount' placeholder='Enter your bank account' value={bankAccount} onChange={(e) => { setBankAccount(e.target.value) }} />
                            </div>
                        </article>

                        <article className='md:grid grid-cols-2 gap-10 md:mt-16'>
                            <div className='flex flex-col'>
                                <label htmlFor="clientName">Enter your client's name</label>
                                <input type="text" name='text' id='clientName' placeholder="Enter your client's name" value={clientName} onChange={(e) => { setClientName(e.target.value) }} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="clientAddress">Enter your client's address</label>
                                <input type="text" name='text' id='clientAddress' placeholder="Enter your client's address" value={clientAddress} onChange={(e) => { setClientAddress(e.target.value) }} />
                            </div>
                        </article>

                        <article className='md:grid grid-cols-3 gap-10 '>
                            <div className='flex flex-col'>
                                <label htmlFor="invoiceNumber">Invoice Number</label>
                                <input type="text" name='text' id='invoiceNumber' placeholder='Invoice Number' value={invoiceNumber} onChange={(e) => { setInvoiceNumber(e.target.value) }} />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="invoiceDate">Invoice Date</label>
                                <input type="date" name='text' id='invoiceDate' placeholder='Invoice Date' value={invoiceDate} onChange={(e) => { setInvoiceDate(e.target.value) }} />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="dueDate">Due Date</label>
                                <input type="date" name='text' id='dueDate' placeholder='Due Date' value={dueDate} onChange={(e) => { setDueDate(e.target.value) }} />
                            </div>
                        </article>

                        {/*  This is our table form  */}
                        <article>
                            <TableForm 
                            description={description} 
                            setDescription={setDescription}
                            price={price} 
                            setPrice={setPrice}
                            amount={amount} 
                            setAmount={setAmount}
                            quantity={quantity} 
                            setQuantity={setQuantity} list={list} setList={setList} total={total} setTotal={setTotal}/>
                        </article>

                        <label htmlFor="notes">Additional Notes</label>
                        <textarea name="notes" id="notes" cols="30" rows="10" placeholder='Additional Notes to the client' value={notes} onChange={(e) => { setNotes(e.target.value) }}></textarea>

                        <button onClick={() => { setShowInvoice(true) }} className='bg-blue-500 text-white py-2 px-8 mt-5 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300'>Preview Invoice</button>
                    </div>
                </>
            }
        </main>
    )
}

export default Invoice