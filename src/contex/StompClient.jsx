import { createContext, useState } from "react";
export const cl = createContext('');
export default function StompClient({children}){
 
    const[stomp,setstomp]=useState({})

    return(
        <cl.Provider value={{stomp,setstomp}}>{children}</cl.Provider>
    )
}