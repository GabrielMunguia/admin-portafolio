import axios from "axios";
import { BASE_URL } from "./backend";


export const agregarProyecto = async (
  titulo,
  subTitulo,
  descripcion,
  sitio,
  tecnologias
) => {
  try {

    const token =JSON.parse(localStorage.getItem('user')).token;

    const data = {
      titulo,
       subTitulo,
      descripcion,
      sitio,
      tecnologias,
    };


    console.log(token)
    let config = {
        headers: {
          "x-token": token,
        }
      }
    const resp = await axios.post(BASE_URL + "/api/proyects", data,config);

    console.log(resp.data);
  } catch (error) {
      console.log(error.response.data)
    return error.response.data;
  }
};
