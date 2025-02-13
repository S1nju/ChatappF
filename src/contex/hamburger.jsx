import { createContext, useState } from "react";
export const menu = createContext('');
export default function Hamberger({children}){
 
    const[darklight,setdark]=useState(true)

    return(
        <menu.Provider value={{darklight,setdark}}>{children}</menu.Provider>
    )
}