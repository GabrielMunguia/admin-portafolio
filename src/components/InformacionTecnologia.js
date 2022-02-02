import React, { useState } from "react";
import Swal from "sweetalert2";

import { actualizarTecnologia, eliminarImagenTecnologia } from "../database/tecnologia";
import { alertaError, alertaPreguntaEliminar, alertaSuccess } from "../helpers/alertas";
import { useForm } from "../hooks/useForm";
import { Imagen } from "./Imagen";

export const InformacionTecnologia = ({
 tecnologia,
  editar,
  refrescar,
  setRefrescar,
  setEditar,
}) => {
    
  const initialState = {
    titulo: tecnologia.titulo

  };
  const { uid } = tecnologia;
  const [formulario, setFormulario] = useForm(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {};

    if (formulario.titulo !== initialState.titulo) {
      data.titulo = formulario.titulo;
    }
    if (formulario.descripcion !== initialState.descripcion) {
      data.descripcion = formulario.descripcion;
    }

    const resp = await actualizarTecnologia(uid, data);
    if (resp.msj || resp.errors) {
      return alertaError(resp.msj || resp.errors[0].msg);
    }

    setEditar(!editar);
    setRefrescar(!refrescar);

    alertaSuccess("Se actualizo correctamente");
  };

  const handleImagen = async () => {
    const { value: file } = await Swal.fire({
      title: "Seleccione la imagen",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = {
          archivo: file,
        };

        console.log(data);

        const resp = await actualizarTecnologia(uid, data);
        setRefrescar(!refrescar);
        if (resp.msj || resp.errors) {
          return alertaError(resp.msj || resp.errors[0].msg);
        }
        console.log(resp);
        Swal.fire({
          title: "Se agrego la imagen correctamente!",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const eliminarImagen=async()=>{
  
    try {
      const seEliminara = await alertaPreguntaEliminar("Estas  seguro de eliminarla?","Se elimino la imagen correctamente!");
      if (seEliminara) {
        const resp = await eliminarImagenTecnologia(uid);
       
   
        setRefrescar(!refrescar);
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div>
      <div className="d-flex justify-content-center mt-4">
      <div className="card col-11 col-10 col-xl-8  shadow shadow-md">
          <div className="card-header bg-dark text-white">INFORMACION TECNOLOGIA </div>
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
                disabled={!editar}
                required={true}
              />
            </div>

           

            {editar && (
              <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-primary">
                  ACTUALIZAR
                </button>
              </div>
            )}

            <div className="d-flex justify-content-end mt-4"></div>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <div className="card col-11 col-10 col-xl-8  shadow shadow-md">
          <div className="card-header bg-dark text-white">IMAGENES </div>
          <div className="card-body px-4">
            <div className="d-flex justify-content-center flex-column align-items-center">
              {editar && (
                <div className="d-flex justify-content-center mt-4 position-relative mb-5">
                  <button
                    onClick={handleImagen}
                    type="button"
                    className="btn btn-primary fs-6"
                  >
                    {tecnologia.img.length <= 0
                      ? "SUBIR IMAGEN"
                      : "REMPLAZAR IMAGEN"}
                  </button>
                </div>
              )}
              {tecnologia.img.length > 0 && (
                <Imagen editar={editar} src={tecnologia.img} eliminar={eliminarImagen} />
              )}
            </div>

            <div className="d-flex justify-content-end mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
