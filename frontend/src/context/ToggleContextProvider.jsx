import React, { useState } from 'react'
import { ToggleContext } from './context'



export default function ToggleContextProvider({children}) {
    const [toggle , setToggle] = useState("dark")
  
 function handleToggle(){
   setToggle((prev)=> prev ==="dark"?"light":"dark")
 }

  return (
     <ToggleContext.Provider value={{toggle,handleToggle}}>
        {children}
     </ToggleContext.Provider>
  )
}
