import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { actualizarSeccion, obtenerSeccion } from "../database/secciones";
import { alertaError, alertaSuccess } from "../helpers/alertas";

import {
  actualizarPresentacion,
  getPresentacion,
} from "./../database/prensentacion";

let initialState = {
  nombre: "",
  status: false,
};

export const DetalleSeccion = ({ editar = true }) => {
  const { id } = useParams();
  const [uid, setUid] = useState(0);
  const [formulario, setFormulario] = useState(initialState);
  const [edicion, setEdicion] = useState(false);

  const handleChange = ({ target }) => {
    setFormulario({
      ...formulario,
      [target.name]: target.value,
    });
  };

  const handleEdicion = () => {
    setEdicion(!edicion);
  };

  const obtenerDatosSeccion = async () => {
    const resp = await obtenerSeccion(id);
   
    const { nombre, status, uid } = await resp;
initialState.nombre=nombre;
    setUid(uid);
    setFormulario({ nombre, status });
  };


  useEffect(() => {
    obtenerDatosSeccion();
  }, []);
  

  useEffect(() => {
  
  }, [formulario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formulario.nombre.trim().length < 1
     
    ) {
      return null;
    }

    let datos={
      status:formulario.status
    }
    if(initialState.nombre!==formulario.nombre){
      datos.nombre=formulario.nombre
    }

    const resp = await actualizarSeccion(uid, datos);
    if (resp.msj || resp.errors) {
      return alertaError(resp.msj || resp.errors[0].msg);
    }
    alertaSuccess("Se actualizo el registro correctamente");

    setEdicion(!editar);
  };

  return (
    <div className="d-flex flex-column  align-items-center">
      <div className="col-11 col-10 col-xl-8  bg-transparent  d-flex justify-content-end align-items-end">
        <button
          onClick={handleEdicion}
          className={
            edicion ? "btn btn-outline-danger" : "btn btn-outline-primary"
          }
        >
          {edicion ? "Desactivar Edicion" : "Activar Edicion"}
        </button>
      </div>

      <div className="d-flex justify-content-center mt-4 col-12">
        <div className="card col-11 col-10 col-xl-8  shadow shadow-md">
          <div className="card-header bg-dark text-white">
            INFORMACION SECCION
          </div>
          <form onSubmit={handleSubmit} className="card-body px-4">
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label fw-bold">
                Titulo
              </label>
              <input
                type="text"
                className="form-control "
                name="nombre"
                id="titulo"
                value={formulario.nombre}
                onChange={handleChange}
                readOnly={!edicion}
                required={true}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="titulo" className="form-label fw-bold">
                Status
              </label>
              <select   disabled={!edicion} name="status" id="cars" className="form-control" value={formulario.status} onChange={handleChange}    >
                <option   value="true" >True</option>
                <option   value="false" >False</option>
          
              </select>
            </div>

            {edicion && (
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary fw-bolder px-3"
                >
                  Actualizar
                </button>
              </div>
            )}

            <div className="d-flex justify-content-end mt-4"></div>
          </form>
        </div>
      </div>
    </div>
  );
};
