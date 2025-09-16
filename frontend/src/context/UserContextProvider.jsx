import React, { useEffect, useState } from 'react'
import { ToggleContext } from './context'
import { jwtDecode } from "jwt-decode";

export default function UserContextProvider({children}) {
const [user, setUSer] = useState(null)
useEffect(()=>{
   const token = localStorage.getItem("token ")
   if(token){
    const decode = jwtDecode(token)
    setUSer({username:decode.username , id:decode.id})
   }
},[])

const loginUser  = (token)=>{
 localStorage.setItem("token",token)
  const decode = jwt_decode(token)
   setUSer({username:decode.username , id:decode.id})
}

const logoutUser= (token)=>{
 localStorage.removeItem(token)
 setUSer(null)
}
  return (
  <ToggleContext.Provider value={{user,loginUser,logoutUser}}>
    {children}
  </ToggleContext.Provider>
  )
}
