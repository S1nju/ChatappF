import axios from "axios";
import { baseurl } from "./api";

import Cookie from 'cookie-universal'
 const cookie = Cookie()
export const Axios = axios.create({
    baseURL: baseurl,
    headers:{
        'Content-Type': 'application/json',

        Authorization:'Bearer '+cookie.get('token')
    }

}

    
   )
   
