import React,{useContext, useState} from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'


const AddDoctor = () => {

    const [docImg,setDocImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experience,setExperience] = useState('1 Year')
    const [fee,setFee] = useState('')
    const [about,setAbout] = useState('')
    const [speciality,setSpeciality] = useState('General physician')
    const [degree,setDegree] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const {backendUrl, aToken} = useContext(AdminContext)

    const EyeIcon = ({ isVisible, onClick }) => (
      <div 
        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
        onClick={onClick}
      >
        {isVisible ? (
          // Hide Icon (Eye with slash)
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l16 16a1 1 0 001.414-1.414l-16-16zM5.121 7.29a3 3 0 014.242 4.242l-4.242-4.242a.997.997 0 00.001-.001z" clipRule="evenodd" />
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M1.383 11.16a.75.75 0 00-.236.425C1.192 12.355 3.328 16 10 16c2.815 0 5.33-1.077 7.005-2.923a.75.75 0 00-.546-1.281 10.45 10.45 0 01-6.459 2.083c-2.31 0-4.498-.55-6.49-1.503a.75.75 0 00-.577.172z" clipRule="evenodd" />
            <path d="M18.883 8.337a.75.75 0 00-.17-.184A10.511 10.511 0 0010 6c-2.825 0-5.358 1.078-7.14 2.946a.75.75 0 00.542 1.282A9.011 9.011 0 0110 7.5c1.889 0 3.655.483 5.226 1.341a.75.75 0 00.178.181z" />
          </svg>
        ) : (
          // Show Icon (Open Eye)
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.758 10C3.185 5.56 6.845 3 10 3s6.815 2.56 9.242 7c-2.427 4.44-6.087 7-9.242 7S3.185 14.44.758 10zM10 15a5 5 0 100-10 5 5 0 000 10z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    );

    const onSubmitHandler = async(event)=>{
      event.preventDefault();
      try {
        setLoading(true)

        if (!docImg){
          setLoading(false)
          return toast.error('Image not selected')
        }

        const formData = new FormData()

        formData.append('image',docImg)
        formData.append('name',name)
        formData.append('email',email)
        formData.append('password',password)
        formData.append('experience',experience)
        formData.append('fee',Number(fee))
        formData.append('about',about)
        formData.append('speciality',speciality)
        formData.append('degree',degree)
        formData.append('address',JSON.stringify({line1:address1,line2:address2}))

        // Console log form data
        formData.forEach((value,key)=>{
          console.log(`${key}:${value}`);
        })

        const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})

        if(data.success){
          toast.success(data.message)
          setDocImg(false)
          setName('')
          setPassword('')
          setEmail('')
          setAddress1('')
          setAddress2('')
          setDegree('')
          setAbout('')
          setFee('')
          setLoading(false)
        } else{
          toast.error(data.message)
          setLoading(false)
        }

      } catch (error) {
        toast.error(error.message)
        setLoading(false)
        console.log(error);
      }
    }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg?URL.createObjectURL(docImg):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden/>
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex-col gap-1'>
              <p>Doctor name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required/>
            </div>

            <div className='flex-1 flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required/>
            </div>

            <div className='flex-1 flex-col gap-1 relative'>
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Doctor Password (min 6 characters)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    id="password"
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    className="appearance-none block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <EyeIcon 
                    isVisible={showPassword} 
                    onClick={() => setShowPassword(!showPassword)} 
                  />
                </div>
          </div>
            </div>

            <div className='flex-1 flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years Plus">10 Years Plus</option>
              </select>
            </div>

            <div className='flex-1 flex-col gap-1'>
              <p>Doctor Fee</p>
              <input onChange={(e)=>setFee(e.target.value)} value={fee} className='border rounded px-3 py-2' type="number" placeholder='Fee' required/>
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroentrologist">Gastroentrologist</option>
              </select>
            </div>

            <div className='flex-1 flex-col gap-1 mt-1'>
              <p>Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required/>
            </div>

            <div className='flex-1 flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='address 1' required/>
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='address 2' required/>
            </div>

          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='write about doctor' rows={5} required/>
        </div>

        <button type='sumbit' className='bg-primary px-10 py-3 text-white rounded-full cursor-pointer' disabled={loading}>
        {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Add Doctor'
            )}
        </button>

      </div>

    </form>
  )
}

export default AddDoctor