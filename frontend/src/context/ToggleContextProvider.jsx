import React, { useState } from 'react'
import { ToggleContext } from './context'



export default function ToggleContextProvider({children}) {
    const [toggle , setToggle] = useState("dark")
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false)


     
 function handleToggle(){
   setToggle((prev)=> prev ==="dark"?"light":"dark")
 }

  return (
     <ToggleContext.Provider value={{toggle,handleToggle,user,setUser,isAuth, setIsAuth}}>
        {children}
     </ToggleContext.Provider>
  )
}
