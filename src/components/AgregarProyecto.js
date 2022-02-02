import React, { useContext, useEffect, useState } from "react";
import { useForm } from "./../hooks/useForm";
import { agregarImagenProyecto, agregarProyecto, agregarVideo } from "./../database/proyectos";
import { AuthContext } from "../auth/authContext";
import { types } from "../types/types";
import {  alertaError, alertaSuccess } from "../helpers/alertas";

const initialState = {
  titulo: "",
  subtitulo: "",
  descripcion: "",
  sitio: "",
  tecnologias: "",
  video:""
};

export const AgregarProyecto = () => {


  const [formulario, setFormulario,reset] = useForm(initialState);

  const { titulo, subtitulo, descripcion, sitio, tecnologias,video } = formulario;

  const [imagenes, setImagenes] = useState([]);



  const { dispatch } = useContext(AuthContext);

  const validarCampos = () => {
    let error =false
    if (titulo.trim().length < 2) {
      error=true;
       alertaError("El titulo es obligatorio");
    } else if (subtitulo.trim().length < 2) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(validarCampos()){
        return ;
      }
      
      const resp = await agregarProyecto(titulo, subtitulo, descripcion, sitio, tecnologias );

      if (resp.msj || resp.errors) {
       return  alertaError(resp.msj || resp.errors[0].msg);
      }

      const uidProyecto =resp.payload.proyecto.uid

      //Si mando imagenes las agrega de una vez

      imagenes?.map(async (x) => {
        await agregarImagenProyecto(x,uidProyecto );
      });

       
      //Valido si vine un video y lo agrego 

      if(video.length>5){
        await  agregarVideo(formulario.video,uidProyecto);
      }

      alertaSuccess()

      reset();


    } catch (error) {

      //Si recibo un error 401 significa que no estoy autorizado y me saca de la app
      if (401) {
        const action = {
          type: types.logout,
        };
        dispatch(action);
        return;
      }

      return alertaError(error[0]);
    }
  };

  const handleFilesChange = (e) => {
    const key = Object.keys(e.target.files);
    let arrayAux = [];
    key.map((x) => {
      const archivos = e.target.files[x];
      arrayAux.push(archivos);
    });
    setImagenes(arrayAux);
  };


  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card col-10 col-xl-8 shadow shadow-md">
        <div className="card-header bg-dark text-white">
         AGREGAR
        </div>
        <form onSubmit={handleSubmit} className="card-body px-4">
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Titulo
            </label>
            <input
              type="text"
              className="form-control"
              name="titulo"
              id="titulo"
              value={formulario.titulo}
              onChange={setFormulario}
              required={true}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="subTitulo" className="form-label">
              Subtitulo
            </label>
            <input
              type="text"
              className="form-control"
              name="subtitulo"
              id="subtitulo"
              value={formulario.subtitulo}
              onChange={setFormulario}
              autoComplete="false"
              required={true}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Descripcion" className="form-label">
              Descripcion
            </label>
            <input
              type="text"
              className="form-control"
              name="descripcion"
              id="Descripcion"
              value={formulario.descripcion}
              onChange={setFormulario}
              autoComplete="false"
              required={true}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sitio" className="form-label">
              Sitio web{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="sitio"
              id="sitio"
              value={formulario.sitio}
              onChange={setFormulario}
              autoComplete="false"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Tecnologias" className="form-label">
              Tecnologias
            </label>
            <input
              type="text"
              className="form-control"
              name="tecnologias"
              id="Tecnologias"
              value={formulario.tecnologias}
              onChange={setFormulario}
              required={true}
              autoComplete="false"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fotos" className="form-label">
              Imagenes
            </label>
            <input
              type="file"
              className="form-control"
              id="fotos"
              onChange={handleFilesChange}
              multiple="multiple"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Videos" className="form-label" autoComplete="false">
              URL Video
            </label>
            <input type="text" className="form-control" name="video" value={formulario.video} onChange={setFormulario} />
          </div>

        <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </div>

          <div className="d-flex justify-content-end mt-4"></div>
        </form>
      </div>
    </div>
  );
};
