import React from "react";
import "../assets/css/components/imagen.css";
export const Imagen = ({ src, editar,eliminar }) => {

 
  const handleClick=async ()=>{

   await  eliminar()
  }
  return (
    <div className="position-relative imagen_contenedor">
      <img className="col-12" src={src} />
      {editar && (
        <div className="imagen_opciones">
          <button onClick={handleClick} className="btn-danger btn">Eliminar</button>
        </div>
      )}
    </div>
  );
};
