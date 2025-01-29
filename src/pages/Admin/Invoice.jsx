import React from 'react'

const Invoice = () => {

    const handlePrint = () => {
        window.print()
    }

    return (
        <div id='section-to-print' className='w-full p-5 bg-white m-5 xl:max-w-4xl xl:mx-auto'>
            {/* Header */}
            <header className='flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between'>
                <div>
                    <h1 className='font-bold uppercase tracking-wide text-4xl mb-3'>Invoicer</h1>
                </div>

                <div>
                    <ul className='flex items-center justify-between flex-wrap gap-2'>
                        <li><button onClick={handlePrint}>Print</button></li>
                        <li><button>Download</button></li>
                        <li><button>Send</button></li>
                    </ul>
                </div>
            </header>

            {/* Your Details */}
            <div className='flex flex-col items-end justify-end'>
                <h2 className='text-xl uppercase'>Thomas Sankara</h2>
                <p>Your Address</p>
            </div>

            {/* Client Details */}
            <div className='mt-5'>
                <h2 className='text-xl uppercase'>Client's Name</h2>
                <p>Client's address</p>
            </div>

            {/* Dates */}
            <article className='my-5 flex items-end justify-end'>
                <ul>
                    <li><span className='font-bold'>Invoice number:</span> </li>
                    <li><span className='font-bold'>Invoice date:</span> </li>
                    <li><span className='font-bold'>Due date:</span> </li>
                </ul>
            </article>

            {/* Table */}
            <div className='my-5'>
                this is the table
            </div>
            {/* Notes */}
            <div className='mb-5'>
                {/* Textarea */}
                <p>Notes to the client...</p>
            </div>

            {/* Footer */}
            <div>
                <ul className='flex flex-wrap items-center justify-center gap-2'>
                    <li><span className='font-bold'>Your Name:</span> Thomas Sankara</li>
                    <li><span className='font-bold'>Your email:</span> sankara@demo.com</li>
                    <li><span className='font-bold'>Phone number:</span> 0712345678</li>
                    <li><span className='font-bold'>Bank:</span> Bank Account</li>
                    <li><span className='font-bold'>Account holder:</span> Thomas Sankara</li>
                    <li><span className='font-bold'>Account number:</span> 123 456 789</li>
                    <li><span className='font-bold'>Website:</span> https://prescripto-frontend-sable.vercel.app/</li>
                </ul>
            </div>
        </div>
    )
}

export default Invoice