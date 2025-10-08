import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const EditAppointment = () => {

    const { appointmentId } = useParams()
    const { appointments, cancelAppointment, completeAppointment, addAppointmentPrescription, addAppointmentNotes, addAppointmentLab } = useContext(DoctorContext)
    const [appointmentData, setAppointmentData] = useState(false)
    const [prescription, setPrescription] = useState("")
    const [notes, setNotes] = useState("")
    const [lab, setLab] = useState(false)

    const navigate = useNavigate()

    const fetchAppointmentData = async () => {

        appointments.map((item) => {
            if (item._id === appointmentId) {
                setAppointmentData(item)
                return null;
            }
        })

    }

    useEffect(()=>{
        fetchAppointmentData()
        setLab(appointmentData.lab)
    },[appointmentData, appointmentId])
 
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
                    <p className='text-gray-600 font-medium text-xl mt-4'>Doctor's Notes</p>
                    {
                        appointmentData.notes ?
                            <p className='text-gray-800 font-medium text-xl my-5'>{appointmentData.notes}</p>
                            : <textarea onChange={(e) => { setNotes(e.target.value) }} className='w-full max-w-[500px] py-6 px-2'></textarea>
                    }
                    <p className='text-gray-600 font-medium text-xl mt-4'>Doctor's Prescription</p>
                    {
                        appointmentData.prescription ?
                            <p className='text-gray-800 font-medium text-xl my-5'>{appointmentData.prescription}</p>
                            : <textarea onChange={(e) => { setPrescription(e.target.value) }} className='w-full max-w-[500px] py-6 px-2'></textarea>
                    }
                    {
                        appointmentData.lab ? 
                        <p className='text-red-800 font-medium text-xl my-5'>Lab has been scheduled</p>
                        : <button onClick={()=>{
                            addAppointmentLab(appointmentData._id)
                            fetchAppointmentData()
                            navigate('/doctor-appointments')
                            window.location.reload()
                        }} className='bg-blue-500 text-white py-2 px-8 mt-5 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300' href="#speciality">
                        Schedule lab 
                    </button>
                    }
                    {
                        appointmentData.cancelled || !appointmentData.isLabComplete ? <p className='text-blue-500 text-2xl font-medium'>Cancelled or awaiting lab results</p> : appointmentData.isCompleted ?
                            <p className='text-green-500 text-2xl font-medium'>Completed</p>
                            : <div className='flex my-5'>
                                <img onClick={() => { cancelAppointment(appointmentData._id) }} className='w-20 cursor-pointer' src={assets.cancel_icon} alt="" />
                                <img onClick={() => {
                                    completeAppointment(appointmentData._id);
                                    addAppointmentPrescription(appointmentData._id, prescription)
                                    addAppointmentNotes(appointmentData._id, notes)
                                }} className='w-20 cursor-pointer' src={assets.tick_icon} alt="" />
                            </div>
                    }
                </div>



            </div>
        </div>
    ) : <div className='opacity-0'></div>
}

export default EditAppointment