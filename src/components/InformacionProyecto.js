import React, { useEffect, useState } from 'react';

import { actualizarProyecto } from '../database/proyectos';
import { alertaError, alertaSuccess } from '../helpers/alertas';
import { useForm } from '../hooks/useForm';

export const InformacionProyecto = ({ proyecto,editar,setEditar}) => {

  const {titulo,subTitulo,descripcion,sitio,tecnologias,uid}=proyecto;
  const initialState = {
    titulo,
    subTitulo,
    descripcion,
    sitio,
    tecnologias,

  };


  const[formulario,setFormulario]=useForm(initialState);



  

  const validarCampos = () => {
    let error =false
    if (titulo.trim().length < 2) {
      error=true;
       alertaError("El titulo es obligatorio");
    } else if (subTitulo.trim().length < 2) {
      error=true;
        alertaError("El subtitulo es obligatorio");
    }  if (descripcion.trim().length < 2) {
      error=true;
        alertaError("La descripcion  titulo es obligatoria");
    }
    if (tecnologias.trim().length < 2) {
      error=true;
        alertaError("Las tecnologias son obligatorias");
    }
    return error;
  };

  const datosParaActualizar=()=>{
    let proyectoActualizado={};

    if(formulario.titulo!==initialState.titulo){
     proyectoActualizado.titulo=formulario.titulo;
    }
     if(formulario.subTitulo!==initialState.subTitulo){
      proyectoActualizado.subTitulo=formulario.subTitulo;
     }

     if(descripcion.subTitulo!==initialState.descripcion){
      proyectoActualizado.descripcion=formulario.descripcion;
     }

     if(descripcion.sitio!==initialState.sitio){
      proyectoActualizado.sitio=formulario.sitio;
     }

     if(descripcion.tecnologias!==initialState.tecnologias){
      proyectoActualizado.tecnologias=formulario.tecnologias;
     }

     return proyectoActualizado;
  }

  const actualizar=async (e)=>{
    e.preventDefault();
   
   const resp=await actualizarProyecto(uid,{...datosParaActualizar()});
   if (resp.msj || resp.errors) {
    return  alertaError(resp.msj || resp.errors[0].msg);
   }
   alertaSuccess("Se actualizo el registro correctamente")

   setEditar(!editar)
  }



   
  return <div>
  

          
          <div className="d-flex justify-content-center mt-4">
            <div className="card col-11 col-10 col-xl-8  shadow shadow-md">
              <div className="card-header bg-dark text-white">INFORMACION GENERAL</div>
              <form className="card-body px-4">
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
                    onChange={setFormulario}
                    readOnly={!editar}
                    required={true}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subTitulo" className="form-label fw-bold">
                    Subtitulo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="subTitulo"
                    id="subtitulo"
                    value={formulario.subTitulo}
                    readOnly={!editar}
                    autoComplete="false"
                    required={true}
                    onChange={setFormulario}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Descripcion" className="form-label fw-bold">
                    Descripcion
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="descripcion"
                    id="Descripcion"
                    value={formulario.descripcion}
                    readOnly={!editar}
                    autoComplete="false"
                    required={true}
                    onChange={setFormulario}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="sitio" className="form-label fw-bold">
                    Sitio web{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="sitio"
                    id="sitio"
                    value={formulario.sitio}
                    readOnly={!editar}
                    autoComplete="false"
                    onChange={setFormulario}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Tecnologias" className="form-label fw-bold">
                    Tecnologias
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="tecnologias"
                    id="Tecnologias"
                    value={formulario.tecnologias}
                    readOnly={!editar}
                    required={true}
                    autoComplete="false"
                    onChange={setFormulario}
                  />
                </div>



                

             

               {editar&& <div className="d-flex justify-content-center">
                  <button
                  onClick={actualizar}
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
