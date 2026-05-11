import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useContext } from 'react'
import { userContext } from '../../context/userContext'
import { LuLogIn } from 'react-icons/lu'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const {updateUser, setToken} = useContext(userContext)

    const navigate = useNavigate()


    //handle login form submit
    const handleLogin = async (e) => {
        e.preventDefault()

        if(!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return
        }

        if(!password){
            setError("Please enter the password")
            return
        }

        setError("")

        //Login API call  
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
            const {token, user} = response.data;
            if(token){
                localStorage.setItem("token", token); 
                setToken(token)
                localStorage.setItem("user", JSON.stringify(user));
                updateUser(user)
                navigate("/dashboard");
            }else{
                setError("Invalid credentials");
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
        <div className='flex flex-col justify-center'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
                <p className='text-gray-500'>Please enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLogin} className='space-y-2'>
                <Input
                value={email} 
                onChange={({target}) => setEmail(target.value)}
                label="Email address"
                placeholder="please enter your email"
                type="text"
                />
                  <Input
                value={password} 
                onChange={({target}) => setPassword(target.value)}
                label="Password "
                placeholder="min 8 characters"
                type="password"
                />
                {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                <button type="submit" className='btn-primary flex items-center justify-center gap-2 mt-4'>
                   <LuLogIn className='text-lg' />
                   <span>Login</span>
                </button>

                <p className='text-[13px] text-slate-800 mt-3'>Don't have  an account? {" "}
                    <Link className='font-medium text-primary underline' to="/signup">
                    Sign Up
                    </Link>
                </p>
            </form>
        </div>
    </Authlayout>
  )
}

export default Login