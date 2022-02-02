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
    const token = JSON.parse(localStorage.getItem("user")).token;

    const datos = {
      titulo,
      subTitulo,
      descripcion,
      sitio,
      tecnologias,
    };

    console.log(token);
    let config = {
      headers: {
        "x-token": token,
      },
    };
    const resp = await axios.post(BASE_URL + "/api/proyects", datos, config);

    return resp.data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      return 401;
    }

    return error.response.data;
  }
};

export const agregarImagenProyecto = async (imagen, proyecto) => {
  try {
    const formData = new FormData();
    formData.append("archivo", imagen);
    const token = JSON.parse(localStorage.getItem("user")).token;
    let config = {
      headers: {
        "x-token": token,
      },
    };

    const resp = await axios.post(
      BASE_URL + "/api/img/proyect/" + proyecto,
      formData,
      config
    );
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
};

export const agregarVideo = async (video, proyecto) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const datos = {
      video,
    };

    console.log(token);
    let config = {
      headers: {
        "x-token": token,
      },
    };
    const resp = await axios.post(
      BASE_URL + "/api/video/proyect/" + proyecto,
      datos,
      config
    );

    return resp.data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      return 401;
    }

    return error.response.data;
  }
};

export const getProyectos=async()=>{
 try{
  const resp=await axios.get(BASE_URL+"/api/proyects");
  return resp.data.payload.proyectos;

 }catch(error){
  return error.response.data;
 }

}

export const eliminarProyecto = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
   
    let config = {
      headers: {
        "x-token": token,
      },
    };
    const resp = await axios.delete(BASE_URL + "/api/proyects/"+id,
    config);

    return resp.data;

  } catch (error) {
    console.log(error.response.data)

 

    if (error.response.status === 401) {
      localStorage.removeItem("user");
      return 401;
    }

    return error.response.data;
  }
};

export const obtenerProyecto=async (id)=>{
  try{
    const resp=await axios.get(BASE_URL+"/api/proyects/"+id);
    console.log(resp.data)
    return resp.data.payload.proyecto;
  
   }catch(error){
    return error.response.data;
   }
}

export const obtenerImagesProyecto=async (id)=>{

  try{
    const resp=await axios.get(BASE_URL+"/api/img/proyect/"+id);
 
    return resp.data.payload;
  
   }catch(error){
    return error.response.data;
   }
}

export const eliminarImagenProyecto=async(id)=>{
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
   
    let config = {
      headers: {
        "x-token": token,
      },
    };
    const resp = await axios.delete(BASE_URL + "/api/img/proyect/"+id,
    config);

    return resp.data;

  } catch (error) {
    console.log(error.response.data)

 

    if (error.response.status === 401) {
      localStorage.removeItem("user");
      return 401;
    }

    return error.response.data;
  }
  

}

export const actualizarProyecto=async( uid,proyecto)=>{ try {
    const token = JSON.parse(localStorage.getItem("user")).token;

  


    let config = {
      headers: {
        "x-token": token,
      },
    };
    const resp = await axios.put(BASE_URL + "/api/proyects/"+uid, proyecto, config);

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

export const obtenerVideosProyecto=async (id)=>{
  try{
    const resp=await axios.get(BASE_URL+"/api/video/proyect/"+id);
 
    return resp.data.payload;
  
   }catch(error){
    return error.response.data;
   }
}

export const eliminarVideos=async (id)=>{
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
   
    let config = {
      headers: {
        "x-token": token,
      },
    };
    const resp = await axios.delete(BASE_URL + "/api/video/proyect/"+id,
    config);

    return resp.data;

  } catch (error) {
    console.log(error.response)

 

    if (error.response.status === 401) {
      localStorage.removeItem("user");
      return 401;
    }

    return error.response.data;
  }
}