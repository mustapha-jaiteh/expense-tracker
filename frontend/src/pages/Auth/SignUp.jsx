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


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

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
    }
  }
  return (
    <Authlayout>
      <div className='lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us tday by signing up</p>


        <form onSubmit={handleSignUp}>
           
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
                <div className='col-span-2'>
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

           <button type="submit" className='btn-primary'>SIGN UP</button>

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