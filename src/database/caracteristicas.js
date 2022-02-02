import axios from "axios";
import { BASE_URL } from "./backend";


export const getCaracteristicas=async()=>{
    

    try {
        const res=  await axios.get(BASE_URL+"/api/about")
     return res.data;
       
      } catch (error) {
     
      
          return error.response.data
          
      }
}

export const getCaracteristica=async (id)=>{
  try {
    const res=  await axios.get(BASE_URL+"/api/about/"+id)
 return res.data;
   
  } catch (error) {

  
      return error.response.data
      
  }
}


export const eliminarCaracteristica=async(id)=>{
    
    const token = JSON.parse(localStorage.getItem("user")).token;
   
    let confing = {
      headers: {
        "x-token": token,
      },
    };
    try {
        const res=  await axios.delete(BASE_URL+"/api/about/"+id,confing)
     return res.data;
       
      } catch (error) {
     
      
          return error.response.data
          
      }
}


//idCaracteristica
export const eliminarImagenCaracteristica=async(id)=>{
    
  const token = JSON.parse(localStorage.getItem("user")).token;
 
  let confing = {
    headers: {
      "x-token": token,
    },
  };
  try {
      const res=  await axios.delete(BASE_URL+"/api/about/img/"+id,confing)
   return res.data;
     
    } catch (error) {
   
    
        return error.response.data
        
    }
}

export const agregarCaracteristica=async(data)=>{
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
    const res=  await axios.post(BASE_URL+"/api/about",formData,confing)
 return res.data;
   
  } catch (error) {
 
  
      return error.response.data
      
  }
}


export const actualizarCaracteristica=async(id,data)=>{
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
     const res=  await axios.put(BASE_URL+"/api/about/"+id,formData,confing)
  return res.data;
    
   } catch (error) {
  
   
       return error.response.data
       
   }
  
}