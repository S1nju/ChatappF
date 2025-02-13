import axios from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { baseurl,googlecallback } from "../../../api/api"
import Cookie from 'cookie-universal'

export default function Refirect(){
    const location =useLocation();
    const cookie = Cookie()
useEffect(()=>{

    async function googlec(){

        try {
            const res =await
        axios.get(baseurl+'/'+googlecallback+location.search);
        const token =res.data.access_token
        cookie.set('token',token)
        console.log(token);

        } catch (error) {
            console.log(error);

        }

    }  googlec();})
    return <div>test</div>
}