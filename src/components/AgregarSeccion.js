import React, { useState } from 'react';
import { agregarCaracteristica } from '../database/caracteristicas';
import { agregarSeccion } from '../database/secciones';
import { alertaError, alertaSuccess } from '../helpers/alertas';
import { useForm } from '../hooks/useForm';
const initialState = {
    nombre: "",
  
  };
export const AgregarSeccion = () => {
    const [formulario, setFormulario,reset] = useForm(initialState);





      const handleSubmit=async (e)=>{
          e.preventDefault();
       
          console.log(formulario)
       
        const resp=  await agregarSeccion(formulario)
        if (resp.msj || resp.errors) {
            return  alertaError(resp.msj || resp.errors[0].msg);
           }


           reset();
         
           alertaSuccess("Se agrego correctamente")
      }




  return     <div className="d-flex justify-content-center mt-4">
  <div className="card col-10 col-xl-8 shadow shadow-md">
    <div className="card-header bg-dark text-white">
     AGREGAR SECCION
    </div>
    <form onSubmit={handleSubmit} className="card-body px-4">
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">
          Titulo
        </label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          id="titulo"
          value={formulario.nombre}
          onChange={setFormulario}
          required={true}
        />
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
};
