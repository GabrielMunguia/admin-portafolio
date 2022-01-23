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