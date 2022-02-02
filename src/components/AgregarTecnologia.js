import React, { useState } from 'react';
import { agregarCaracteristica } from '../database/caracteristicas';
import { agregarTecnologia } from '../database/tecnologia';
import { alertaError, alertaSuccess } from '../helpers/alertas';
import { useForm } from '../hooks/useForm';
const initialState = {
    titulo: "",

  };
export const AgregarTecnologia = () => {
    const [formulario, setFormulario,reset] = useForm(initialState);
    const [imagen, setImagenes] = useState(null);


    const handleFilesChange = (e) => {
      
 
        setImagenes(e.target.files);
      };

      const handleSubmit=async (e)=>{
          e.preventDefault();
          let data={...formulario};
          if(imagen!==null){
              data.archivo=imagen;
          }
          
       
        const resp=  await agregarTecnologia(data)
        if (resp.msj || resp.errors) {
            return  alertaError(resp.msj || resp.errors[0].msg);
           }
           reset();
           setImagenes(null)
           alertaSuccess("Se agrego correctamente")
      }

  return     <div className="d-flex justify-content-center mt-4">
  <div className="card col-10 col-xl-8 shadow shadow-md">
    <div className="card-header bg-dark text-white">
     AGREGAR TECNOLOGIA
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
        <label htmlFor="fotos" className="form-label">
          Imagen
        </label>
        <input
          type="file"
          className="form-control"
          id="fotos"
          onChange={handleFilesChange}
    
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
