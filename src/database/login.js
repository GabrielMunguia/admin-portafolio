import axios from 'axios'
import { BASE_URL } from './backend'

export const loginUsuario=async (correo="",password="")=>{

  const datos ={
    correo,password
  }
  console.log(datos)
 try {
   const res=  await axios.post(BASE_URL+"/api/users/login",datos)
return res.data;
  
 } catch (error) {

 
     return error.response.data
     
 }
}

export const updateAccount=async (data)=>{

  const token = JSON.parse(localStorage.getItem("user")).token;

console.log(data)
  const formData = new FormData();
  formData.append("password", data.password);
 
 if(data.archivo!==undefined){
 
 
   formData.append("archivo", data.archivo);
 }
 if(data.nombre!==undefined){
 
  formData.append("nombre", data.nombre);
}
if(data.newPassword!==undefined){
 
  formData.append("newPassword", data.newPassword);
}

 
 
  console.log(formData)
   let confing = {
     headers: {
       "x-token": token,
     },
   };
 
   try {
     const res=  await axios.put(BASE_URL+"/api/users/login",formData,confing)
  return res.data;
    
   } catch (error) {
  
   
       return error.response.data
       
   }
  

}