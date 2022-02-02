import axios from "axios";
import { BASE_URL } from "./backend";

export const agregarTecnologia=async(data)=>{
    const token = JSON.parse(localStorage.getItem("user")).token;
   const formData = new FormData();
  if(data.archivo!==undefined){
  
    formData.append("archivo", data.archivo[0]);
  }
   formData.append("titulo", data.titulo);
  
   console.log(formData)
    let confing = {
      headers: {
        "x-token": token,
      },
    };
  
    try {
      const res=  await axios.post(BASE_URL+"/api/technologies",formData,confing)
   return res.data;
     
    } catch (error) {
   
    
        return error.response.data
        
    }
  }

  
export const obtenerTecnologias=async()=>{
    

  try {
      const res=  await axios.get(BASE_URL+"/api/technologies")
   return res.data;
     
    } catch (error) {
   
    
        return error.response.data
        
    }
}

export const obtenerTecnologia=async (id)=>{
try {
  const res=  await axios.get(BASE_URL+"/api/technologies/"+id)
return res.data;
 
} catch (error) {


    return error.response.data
    
}
}

export const eliminarTecnologia=async(id)=>{
    
  const token = JSON.parse(localStorage.getItem("user")).token;
 
  let confing = {
    headers: {
      "x-token": token,
    },
  };
  try {
      const res=  await axios.delete(BASE_URL+"/api/technologies/"+id,confing)
   return res.data;
     
    } catch (error) {
   
    
        return error.response.data
        
    }
}



//id Tecnologia
export const eliminarImagenTecnologia=async(id)=>{
    
  const token = JSON.parse(localStorage.getItem("user")).token;
 
  let confing = {
    headers: {
      "x-token": token,
    },
  };
  try {
      const res=  await axios.delete(BASE_URL+"/api/technologies/img/"+id,confing)
   return res.data;
     
    } catch (error) {
   
    
        return error.response.data
        
    }
}


export const actualizarTecnologia=async(id,data)=>{
  const token = JSON.parse(localStorage.getItem("user")).token;


  const formData = new FormData();
 if(data.archivo!==undefined){

 
   formData.append("archivo", data.archivo);
 }
 if(data.titulo!==undefined){
 
  formData.append("titulo", data.titulo);
}

 
 
 
  console.log(formData)
   let confing = {
     headers: {
       "x-token": token,
     },
   };
 
   try {
     const res=  await axios.put(BASE_URL+"/api/technologies/"+id,formData,confing)
  return res.data;
    
   } catch (error) {
  
   
       return error.response.data
       
   }
  
}