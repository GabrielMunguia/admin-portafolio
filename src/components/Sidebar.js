import React, { useContext, useState } from "react";
import { types } from "../types/types";
import { AuthContext } from "../auth/authContext";
import "../assets/css/components/sidebar.css";
import SidebarOpcion from "./SidebarOpcion";

const opciones = {
  presentacion: [
    { nombre: "Ver presentacion", ruta: "/presentacion", accion: "ver" },
   
  ],
  proyectos: [
    { nombre: "Ver proyectos", ruta: "/verProyectos", accion: "ver" },
    { nombre: "Agregar proyectos", ruta: "/agregarProyectos", accion: "agregar" },
   
  ],
  secciones: [
    { nombre: "Ver secciones", ruta: "/verSecciones", accion: "ver" },
    { nombre: "Agregar secciones", ruta: "/agregarSeccion", accion: "agregar" },
   
  ],
  caracteristicas: [
    { nombre: "Ver caracteristicas", ruta: "/verCaracteristicas", accion: "ver" },
    { nombre: "Agregar caracteristicas", ruta: "/agregarCaracteristicas", accion: "agregar" },
   
  ],

  tecnologias: [
    { nombre: "Ver tecnologias", ruta: "/verTecnologias", accion: "ver" },
    { nombre: "Agregar tecnologias", ruta: "/agregarTecnologia", accion: "agregar" },
   
  ],

  informacionPersonal: [
    { nombre: "Ver informacion Personal", ruta: "/verInformacionPersonal", accion: "ver" },
    { nombre: "Agregar informacion Personal", ruta: "/agregarInformacionPersonal", accion: "agregar" },
   
  ],
};

export const Sidebar = ({ estadoMenu }) => {
  const { dispatch, user } = useContext(AuthContext);

  const { usuario } = user;

  const handleLogout = () => {
    const action = {
      type: types.logout,
    };
    dispatch(action);
  };

  return (
    <nav
      className={` sidebar min-vh-100 bg-dark col-2 d-flex flex-column justify-content-between  text-white ${
        estadoMenu ? "sidebar_open" : "sidebar_close"
      }`}
    >
      <div className="mt-4 px-2 overflow-auto sidebar">
        <div className=" mb-5 d-flex align-items-center justify-content-start sidebar_header bg-dark col-12">
          <img
            className="col-2 sidebar-user-image rounded rounded-circle border border-1 border-dark "
            src={usuario.img}
          />
          <div className="ms-2">
            <p className="m-0 ms-3">Bienvenido</p>
            <p className="   d-flex m-0 ms-3 fs-6">{usuario.nombre}</p>
          </div>
        </div>
        <SidebarOpcion titulo="Inicio" ruta="/"  />

        <SidebarOpcion titulo="Presentacion" opciones={opciones.presentacion} />

        <SidebarOpcion titulo="Proyectos" opciones={opciones.proyectos} />

        <SidebarOpcion titulo="Caracteristicas" opciones={opciones.caracteristicas} />

        <SidebarOpcion titulo="Secciones" opciones={opciones.secciones} />

        <SidebarOpcion titulo="Tecnologias" opciones={opciones.tecnologias} />

        <SidebarOpcion titulo="Informacion personal" opciones={opciones.informacionPersonal} />
   
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary col-10 mt-4 m-1 mb-3"
          onClick={handleLogout}
        >
          Cerrar Session
        </button>
      </div>
    </nav>
  );
};
