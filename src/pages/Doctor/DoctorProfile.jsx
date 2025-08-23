import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const DoctorProfile = () => {

  const {dToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(DoctorContext)
  const {currency} = useContext(AppContext)
  const [docImg,setDocImg] = useState(false)
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')
  

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async() =>{
    try {

      const formData = new FormData()

      if(docImg){
        formData.append('image', docImg)
      }
      formData.append('about', profileData.about)
      formData.append('address', JSON.stringify({line1:address1, line2:address2}))
      formData.append('fee', Number(profileData.fee))
      formData.append('available', profileData.available)
      // Add docId to ensure it's available in req.body after multer processing
      formData.append('docId', profileData._id)
      
      

      // Console log form data
      formData.forEach((value,key)=>{
        console.log(`${key}:${value}`);
      })

      const {data} = await axios.post(backendUrl+'/api/doctor/update-profile',formData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  } 

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])

  return profileData && (
    <div>

      <div className='flex flex-col gap-4 m-5'>
        <div>
          {
            isEdit? 
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
              <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                  <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg?URL.createObjectURL(docImg):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden/>
                <p>Upload doctor <br /> picture</p>
              </div>
            </div>
            : <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
          }
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* ---------- Doc Info: name, degree, experience ------------ */}
          <p className='flex items-center gap-2 text-3xl font-medium'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* ------------- Doc About -------------------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            {
              isEdit ? <textarea onChange={(e)=>{setProfileData(prev=>({...prev, about:e.target.value}))}} className='w-full px-4 pt-2 border rounded' placeholder={profileData.about} rows={5}></textarea>
              : <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
            }
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-800'>{currency} {isEdit? <input type="number" onChange={(e)=>{setProfileData(prev=>({...prev, fee:e.target.value}))}} value={profileData.fee}/> :profileData.fee}</span>
          </p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit? <input type="text" onChange={(e)=>{setAddress1(e.target.value)}} value={profileData.address.line1} /> :profileData.address.line1}
            <br />
              {isEdit? <input type="text" onChange={(e)=>{setAddress2(e.target.value)}} value={profileData.address.line2} /> :profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={()=>{isEdit && setProfileData(prev=>({...prev, available: !prev.available}))}} checked={profileData.available} type="checkbox" name="" id="" />
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit ?
            <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
            : <button onClick={()=>{setIsEdit(true)}} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }
        </div>
      </div>

    </div>
  )
}

export default DoctorProfile