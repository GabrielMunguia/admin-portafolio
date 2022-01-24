import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/components/siderbarOption.css";
import arrow from "../assets/img/arrow.png";

//Opciones =[{nombre,ruta,accion}]

const SidebarOpcion = ({ titulo, opciones = [] }) => {
  const [menuActivo, setmenuActivo] = useState(false);

  const getIcono = (accion) => {
    switch (accion.toUpperCase()) {
      case "VER":
        return "fa-eye";

      case "EDITAR":
        return "fa-edit";

      case "ELIMINAR":
        return "fa-trash-alt";

      case "AGREGAR":
        return "fa-plus-square";

      default:
        return "";
    }
  };

  const handleClick = () => {
    setmenuActivo(!menuActivo);
  };

  return (
    <div className="sidebar-option-container ">
      <div
        onClick={handleClick}
        className=" sidebar-option-principal p-3 d-flex justify-content-between align-items-center mb-2"
      >
        <p className="p-0 m-0"> {titulo?.toUpperCase()}</p>
        <img
          className={`col-1  ${menuActivo ? "sidebar-arrow" : ""}  `}
          src={arrow}
        />
      </div>
      <ul className="list-group "
      >
        {opciones.map((opc, i) => (
          <Link
         to={opc.ruta||"#"}
            key={i}
            className={`list-unstyled text-muted btn  m-1 mb-3 sidebar-opc d-flex justify-content-between align-items-center ${ menuActivo ? " siderbar-option" : " d-none" }`}
          >
            <i className={`far ${getIcono(opc.accion)} me-2`}></i>
            <div className=" col-11 d-flex "> {opc.nombre}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SidebarOpcion;
