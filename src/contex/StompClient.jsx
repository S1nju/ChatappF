import { createContext, useState } from "react";
export const cl = createContext('');
export default function StompClient({children}){
 
    const[stompClient,setStompClient]=useState({})

    return(
        <cl.Provider value={{stompClient,setStompClient}}>{children}</cl.Provider>
    )
}