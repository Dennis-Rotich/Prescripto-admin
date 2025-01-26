import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { Route, Routes  } from 'react-router';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorList from './pages/Admin/DoctorsList.jsx'
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
import AddMedicine from './pages/Admin/AddMedicine.jsx';
import ListMedicine from './pages/Admin/ListMedicine.jsx';
import Orders from './pages/Admin/Orders.jsx';
import EditAppointment from './pages/Doctor/EditAppointment.jsx';
import ViewAppointment from './pages/Admin/ViewAppointment.jsx';

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD] min-h-screen'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start w-full'>
        <Sidebar/>
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
          <Route path='/add-medicine' element={<AddMedicine/>}/>
          <Route path='/medicine-list' element={<ListMedicine/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/appointment/:appointmentId' element={<ViewAppointment />}/>

          {/* Doctor Route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>
          <Route path='/edit-appointment/:appointmentId' element={<EditAppointment />}/>
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login/>
      <ToastContainer/>
    </div>
  )
}

export default App