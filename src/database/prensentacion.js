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

export const actualizarPresentacion=async(uid,presentacion)=>{
    try{  const token = JSON.parse(localStorage.getItem("user")).token;

 

    let config = {
      headers: {
        "x-token": token,
      },
    };
    const resp = await axios.put(BASE_URL + "/api/presentation/"+uid, presentacion, config);

    return resp.data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      return 401;
    }

    return error.response.data;
  }
}