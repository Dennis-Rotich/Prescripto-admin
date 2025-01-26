import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const EditAppointment = () => {

    const { appointmentId } = useParams()
    const { appointments, cancelAppointment, completeAppointment, addAppointmentPrescription } = useContext(DoctorContext)
    const [appointmentData, setAppointmentData] = useState(false)
    const [prescription, setPrescription] = useState("")

    const fetchAppointmentData = async () => {

        appointments.map((item) => {
            if (item._id === appointmentId) {
                setAppointmentData(item)
                return null;
            }
        })

    }

    useEffect(() => {
        fetchAppointmentData()
    }, [appointmentId, appointments])

    return appointmentData ? (
        <div>
            <div className='flex flex-col gap-4 m-5'>

                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={appointmentData.userData.image} alt="" />
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
                    <p className='flex items-center gap-2 text-3xl font-medium'>Patient Name: <span className='text-gray-700'>{appointmentData.userData.name}</span></p>
                    <p className='flex items-center gap-2 text-3xl font-medium'>Doctor Name: <span className='text-gray-700'>{appointmentData.docData.name}</span></p>
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
                    <p className='text-gray-600 font-medium text-xl mt-4'>Doctor's Prescription</p>
                    <textarea onChange={(e)=>{setPrescription(e.target.value)}} className='w-full max-w-[500px] py-6 px-2'></textarea>
                    {
                        appointmentData.cancelled ? <p className='text-red-400 text-2xl font-medium'>Cancelled</p> : appointmentData.isCompleted ?
                            <p className='text-green-500 text-2xl font-medium'>Completed</p>
                            : <div className='flex'>
                                <img onClick={() => { cancelAppointment(appointmentData._id) }} className='w-20 cursor-pointer' src={assets.cancel_icon} alt="" />
                                <img onClick={() => {
                                     completeAppointment(appointmentData._id);
                                     addAppointmentPrescription(appointmentData._id, prescription) }} className='w-20 cursor-pointer' src={assets.tick_icon} alt="" />
                            </div>
                    }
                </div>

            </div>
        </div>
    ) : <div className='opacity-0'></div>
}

export default EditAppointment