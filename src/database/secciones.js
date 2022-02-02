import axios from "axios";
import { BASE_URL } from "./backend"

export const obtenerSecciones=async()=>{
try {
    const resp =await  axios.get(BASE_URL+"/api/sections")

    return resp.data.payload.secciones;

}catch(error){
 return error.response.data;
}
}


export const obtenerSeccion=async(id)=>{
    try {
        const resp =await  axios.get(BASE_URL+"/api/sections/"+id)
     
        return resp.data.payload.seccion;
    
    }catch(error){
     return error.response.data;
    }
    }


export const actualizarSeccion=async(uid,datos)=>{
    try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        let config = {
          headers: {
            "x-token": token,
          },
        };
        const resp = await axios.put(BASE_URL + "/api/sections/"+uid, datos, config);
    
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

export const agregarSeccion=async(data)=>{
  const token = JSON.parse(localStorage.getItem("user")).token;



   let confing = {
     headers: {
       "x-token": token,
     },
   };
 
   try {
     const res=  await axios.post(BASE_URL+"/api/sections",data,confing)
  return res.data;
    
   } catch (error) {
  
   
       return error.response.data
       
   }
}

export const eliminarSeccion = async(id)=>{
  const token = JSON.parse(localStorage.getItem("user")).token;


  let confing = {
    headers: {
      "x-token": token,
    },
  };

  try {
    const res=  await axios.delete(BASE_URL+"/api/sections/"+id,confing)
 return res.data;
   
  } catch (error) {
 
  
      return error.response.data
      
  }
}