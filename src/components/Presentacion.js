import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPresentacion } from './../database/prensentacion';


export const Presentacion = () => {
  const navigate = useNavigate();
  const [presentacion, setPresentacion] = useState("");
 
  const ir=()=>{
    navigate('/cursos', {
      replace: true
  });
  }

  const obtenerPresentacion =async()=>{
    const resp = await getPresentacion();
    console.log(resp)

    setPresentacion(resp.payload.presentacion)
    console.log(presentacion)
  }

  useEffect(() => {
    obtenerPresentacion()
  }, []);
  

  useEffect(() => {
    console.log(presentacion)
  }, [presentacion]);
  

 
  return <div className="  w-100 fs-1">
{presentacion.titulo}<br/>
{presentacion.descripcion}
<br/>
  
  <button onClick={ir}>Ir al otro menu</button>
  </div>;
};
