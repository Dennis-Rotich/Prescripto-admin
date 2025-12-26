// ResetPassword.jsx or ResetPassword.vue
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DoctorContext } from './context/DoctorContext.jsx';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [tokenValid, setTokenValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {backendUrl} = useContext(DoctorContext)

  // Get token from URL parameters
  const { token } = useParams();
  const navigate = useNavigate();

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

  // Verify token when component mounts
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const {data} = await axios.get(backendUrl+`/api/doctor/reset-password/${token}`);
        
        
        if (data.success) {
          setTokenValid(true);
          setEmail(data.email);
        } else {
          toast.error("Invalid or expired reset link")
          setMessage('Invalid or expired reset link');
          setTokenValid(false);
        }
      } catch (error) {
        console.log(error.message);
        toast.error('Error verifying reset link')
        setMessage('Error verifying reset link');
        setTokenValid(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.warn('Passwords do not match')
      setMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.warn('Password must be at least 6 characters')
      setMessage('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const {data} = await axios.post(backendUrl+`/api/doctor/reset-password/${token}`,{password})

      if (data.success) {
        toast.success('Password reset successfully! Redirecting to login...')
        setMessage('Password reset successfully! Redirecting to login...');
        setTimeout(() => navigate('/'), 3000);
      } else {
        toast.error(data.error || 'Failed to reset password')
        setMessage(data.error || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid && message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl text-center border-l-4 border-red-500">
        <h2 className='text-3xl font-extrabold text-red-600 flex items-center justify-center'>Invalid Reset Link</h2>
        <p className="text-md text-gray-700 mt-4">{message}</p>
        <button onClick={() => navigate('/forgot-password')} className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150">
          Request New Reset Link
        </button>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl transform transition duration-500 hover:scale-[1.01]">
      <h2 className="text-3xl font-extrabold text-center text-gray-900">Reset Your Password</h2>
      <p className="text-sm text-center text-gray-600 border-b pb-4">For: {email}</p>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password (min 6 characters)
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
        
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
            <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="appearance-none block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <EyeIcon 
                isVisible={showConfirmPassword} 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              />
            </div>
          </div>
        
        <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">
        {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Reset Password'
            )}
        </button>
      </form>
      
      {message && (
          <p className={`mt-4 text-center text-sm font-medium ${message.startsWith('Success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
    </div>
    </div>
  );
};

export default ResetPassword;