import React from 'react'
import { createContext, useState } from 'react'

const userContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [token, setToken] = useState(localStorage.getItem("token") || null)

    // function to update user data
    const updateUser = (userData) => {
        setUser(userData)
    }

    // function to clear user data after logout
    const clearUser = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    } 
    return (
        <userContext.Provider value={{user, token, setUser, setToken, updateUser, clearUser}}>
            {children}
        </userContext.Provider>
    )
}

export {UserProvider, userContext}