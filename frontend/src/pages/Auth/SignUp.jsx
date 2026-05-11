import React, {useState} from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhtSelector'
import { useContext } from 'react'
import { userContext } from '../../context/userContext'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import { uploadImage } from '../../utils/uploadImage'
import { LuUserPlus } from 'react-icons/lu'


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const {updateUser, setToken} = useContext(userContext)
  const navigate = useNavigate() 

  const handleSignUp = async (e) => {
    e.preventDefault()
      
    let profileImageUrl = ""
    
    if(!fullName.trim()) {
      setError("Please enter your full name.")
      return
    }
    if(!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if(!password){
      setError("Please enter the password")
      return
    }

    setError("")
    setLoading(true)

    //Sign Up API call 
    try {

      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || " "
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, { fullName, email, password, profileImageUrl  });
      const {token, user} = response.data;
      if(token){
        localStorage.setItem("token", token); 
        setToken(token) 
        localStorage.setItem("user", JSON.stringify(user));
        updateUser(user)
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message); 
      }else{
        setError("Something went wrong");
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <Authlayout>
      <div className='flex flex-col justify-center'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Create Account</h1>
          <p className='text-gray-500'>Join us today and start managing your finances smarter.</p>
        </div>

        <form onSubmit={handleSignUp} className='space-y-4'>
           
           <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
           />


          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
               <Input
                value={fullName} 
                onChange={({target}) => setFullName(target.value)}
                label="Full Name"
                placeholder="please enter your full name"
                type="text"
                />

                <Input
                value={email} 
                onChange={({target}) => setEmail(target.value)}
                label="Email address"
                placeholder="please enter your email"
                type="text"
                />
                <div className='md:col-span-2'>
                <Input
                value={password} 
                onChange={({target}) => setPassword(target.value)}
                label="Password"
                placeholder="please enter your password"
                type="password"
                />
                </div>
          </div>

           {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

           <button 
             type="submit" 
             disabled={loading}
             className='btn-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed'
           >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LuUserPlus className='text-lg' />
              )}
             <span>{loading ? "Creating account..." : "Sign Up"}</span>
           </button>

           <p className='text-[13px] text-slate-800 mt-3'>Already have an account? {" "}
            <Link className='font-medium text-primary underline' to="/login">
            Login
            </Link>
           </p>
        </form>
      </div>
    </Authlayout>
  )
}

export default SignUp