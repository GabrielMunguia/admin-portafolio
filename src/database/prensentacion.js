import axios from "axios";
import { BASE_URL } from "./backend";

export const getPresentacion=async () =>{

    try {
        const res=  await axios.get(BASE_URL+"/api/presentation")
     return res.data;
       
      } catch (error) {
     
      
          return error.response.data
          
      }
}