import React,{useState} from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import '../assets/css/router/dashboardRouter.css'
import { Presentacion } from './../components/Presentacion';
import { Sidebar } from './../components/Sidebar';
import Cursos from './../components/Cursos';
import Home from './../components/Home';
import { AgregarProyecto } from "../components/AgregarProyecto";
import { DetalleProyecto } from "../components/DetalleProyecto";
import { VerCaracteristicas } from "../components/VerCaracteristicas";
import { AgregarCaracteristica } from "../components/AgregarCaracteristica";
import { DetalleCaracteristica } from "../components/DetalleCaracteristica";
import { VerSecciones } from "../components/VerSecciones";
import { DetalleSeccion } from "../components/DetalleSeccion";
import { AgregarSeccion } from "../components/AgregarSeccion";
import { AgregarTecnologia } from "../components/AgregarTecnologia";
import { VerProyectos } from "../components/VerProyectos";
import { VerTecnologias } from "../components/VerTecnologias";
import { DetalleTecnologia } from "../components/DetalleTecnologia";
import { VerinformacionPersonal } from "../components/VerInformacionPersonal";
import { AgregarInformacionPersonal } from "../components/AgregarInformacionPersonal";
import { DetalleInformacionPersonal } from "../components/DetalleInformacionPersonal";
import { Configuracion } from "../components/Configuracion";


export const Dashboard = () => {

  const [estadoMenu, setEstadoMenu] = useState(true);

  return (
    <div className="d-flex">
      <Sidebar estadoMenu={estadoMenu} />
      <div className="w-100 dasboard-router">
     <Navbar estadoMenu={estadoMenu} setEstadoMenu={setEstadoMenu} />
       <div className="mt-5 ">
       <Routes>
          <Route path="/presentacion" element={<Presentacion />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/agregarProyectos" element={<AgregarProyecto />} />
          <Route path="/verProyectos" element={<VerProyectos/>} />
          <Route path="/detalleProyecto/:id" element={<DetalleProyecto/>} exact />
          <Route path="/verCaracteristicas" element={<VerCaracteristicas/>}  />
          <Route path="/agregarCaracteristicas" element={<AgregarCaracteristica/>}  />
          <Route path="/detalleCaracteristica/:id" element={<DetalleCaracteristica/>} exact />
          <Route path="/VerSecciones/" element={<VerSecciones/>}  />
          <Route path="/detalleSeccion/:id" element={<DetalleSeccion/>} exact />
          <Route path="/agregarSeccion" element={<AgregarSeccion/>}  />
          <Route path="/AgregarTecnologia" element={<AgregarTecnologia/>}  />
          <Route path="/verTecnologias" element={<VerTecnologias/>}  />
          <Route path="/detalleTecnologia/:id" element={<DetalleTecnologia/>}exact  />
          <Route path="/verInformacionPersonal" element={<VerinformacionPersonal/>}  />
          <Route path="/agregarInformacionPersonal" element={<AgregarInformacionPersonal/>}  />
          <Route path="/detalleInformacionPersonal/:id" element={<DetalleInformacionPersonal/>} exact />
          <Route path="/configuracion" element={<Configuracion/>}  />
          <Route path="/*" element={<Home />} />
        </Routes>
       </div>
      </div>
    </div>
  );
};
