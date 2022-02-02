import axios from "axios";
import { BASE_URL } from "./backend";


export const obtenerInformacionPersonales=async()=>{
    

    try {
        const res=  await axios.get(BASE_URL+"/api/personalInformation")
     return res.data;
       
      } catch (error) {
     
      
          return error.response.data
          
      }
}

export const obtenerInformacionPersonal=async (id)=>{
  try {
    const res=  await axios.get(BASE_URL+"/api/personalInformation/"+id)
 return res.data;
   
  } catch (error) {

  
      return error.response.data
      
  }
}


export const eliminarInformacionPersonal=async(id)=>{
    
    const token = JSON.parse(localStorage.getItem("user")).token;
   
    let confing = {
      headers: {
        "x-token": token,
      },
    };
    try {
        const res=  await axios.delete(BASE_URL+"/api/personalInformation/"+id,confing)
     return res.data;
       
      } catch (error) {
     
      
          return error.response.data
          
      }
}


//idCaracteristica
export const eliminarImagenInformacionPersonal=async(id)=>{
    
  const token = JSON.parse(localStorage.getItem("user")).token;
 
  let confing = {
    headers: {
      "x-token": token,
    },
  };
  try {
      const res=  await axios.delete(BASE_URL+"/api/personalInformation/img/"+id,confing)
   return res.data;
     
    } catch (error) {
   
    
        return error.response.data
        
    }
}

export const agregarInformacionPersonal=async(data)=>{
  const token = JSON.parse(localStorage.getItem("user")).token;


 const formData = new FormData();
if(data.archivo!==undefined){

  formData.append("archivo", data.archivo[0]);
}
 formData.append("titulo", data.titulo);
 formData.append("descripcion", data.descripcion);

 console.log(formData)
  let confing = {
    headers: {
      "x-token": token,
    },
  };

  try {
    const res=  await axios.post(BASE_URL+"/api/personalInformation",formData,confing)
 return res.data;
   
  } catch (error) {
 
  
      return error.response.data
      
  }
}


export const actualizarInformacionPersonal=async(id,data)=>{
  const token = JSON.parse(localStorage.getItem("user")).token;


  const formData = new FormData();
 if(data.archivo!==undefined){
   console.log('se agrego')
 
   formData.append("archivo", data.archivo);
 }
 if(data.titulo!==undefined){
 
  formData.append("titulo", data.titulo);
}
if(data.descripcion!==undefined){
 
  formData.append("descripcion", data.descripcion);
}
 
 
 
  console.log(formData)
   let confing = {
     headers: {
       "x-token": token,
     },
   };
 
   try {
     const res=  await axios.put(BASE_URL+"/api/personalInformation/"+id,formData,confing)
  return res.data;
    
   } catch (error) {
  
   
       return error.response.data
       
   }
  
}