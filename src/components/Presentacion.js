import React, { useEffect, useState } from 'react';
import { alertaError, alertaSuccess } from '../helpers/alertas';

import { actualizarPresentacion, getPresentacion } from './../database/prensentacion';


const initialState={
  titulo:"",
  descripcion:""
}

export const Presentacion = ({editar=true}) => {
  const [uid,setUid]=useState(0);
  const [formulario,setFormulario]=useState(initialState);
const [edicion, setEdicion] = useState(false);
  const handleChange=({target})=>{
   setFormulario({
    ...formulario,
    [ target.name ]: target.value
   })
 
  }

  const handleSubmit=async(e)=>{
e.preventDefault();
if(formulario.titulo.trim().length<1||formulario.descripcion.trim().length<1){
  return null;

}
const resp= await actualizarPresentacion(uid,formulario);
if (resp.msj || resp.errors) {
  return  alertaError(resp.msj || resp.errors[0].msg);
 }
 alertaSuccess("Se actualizo el registro correctamente")

 setEdicion(!editar)


  }
  const handleEdicion=()=>{
    setEdicion(!edicion)
  }


  const obtenerPresentacion =async()=>{
    const resp = await getPresentacion();
   
    const {titulo,descripcion,uid}=await resp.payload.presentacion;
   
    setUid(uid);
          setFormulario({titulo,descripcion})
    
  }

  useEffect(() => {
    obtenerPresentacion()
  }, []);
  

  useEffect(() => {
  
  }, [formulario]);
  

 
  return <div className='d-flex flex-column  align-items-center'>
  
  <div className="col-11 col-10 col-xl-8 bg-transparent  d-flex justify-content-end align-items-end ">
      <button onClick={handleEdicion} className={edicion?"btn btn-outline-danger":"btn btn-outline-primary"}>
        {edicion?"Desactivar Edicion":"Activar Edicion"}
        </button>
    </div>
          
  <div className="d-flex justify-content-center mt-4 col-12">
 
    <div className="cardcol-11 col-10 col-xl-8  shadow shadow-md">
      <div className="card-header bg-dark text-white">INFORMACION GENERAL</div>
      <form onSubmit={handleSubmit} className="card-body px-4">

        <div className="mb-3">
          <label htmlFor="titulo" className="form-label fw-bold">
            Titulo
          </label>
          <input
            type="text"
            className="form-control "
            name="titulo"
            id="titulo"
            value={formulario.titulo}
            onChange={handleChange}

            readOnly={!edicion}
            required={true}
          />
        </div>


        <div className="mb-3">
          <label htmlFor="titulo" className="form-label fw-bold">
            Descripcion
          </label>
          <textarea
            type="text"
            className="form-control "
            name="descripcion"
            id="titulo"
            value={formulario.descripcion}
            onChange={handleChange}
            readOnly={!edicion}
            required={true}
          />
        </div>
        


       
        

     

       {edicion&& <div className="d-flex justify-content-center">
          <button
         
            type="submit"
            className="btn btn-primary fw-bolder px-3"
          >
            Actualizar
          </button>
        </div>}

        <div className="d-flex justify-content-end mt-4"></div>
      </form>
    </div>
  </div>


</div>;
};
