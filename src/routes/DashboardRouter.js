import React,{useState} from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import '../assets/css/router/dashboardRouter.css'
import { Presentacion } from './../components/Presentacion';
import { Sidebar } from './../components/Sidebar';
import Cursos from './../components/Cursos';
import Home from './../components/Home';
import { AgregarProyecto } from "../components/AgregarProyecto";

export const Dashboard = () => {

  const [estadoMenu, setEstadoMenu] = useState(true);

  return (
    <div className="d-flex">
      <Sidebar estadoMenu={estadoMenu} />
      <div className="w-100 dasboard-router">
     <Navbar estadoMenu={estadoMenu} setEstadoMenu={setEstadoMenu} />
       <div className="mt-5 py-3">
       <Routes>
          <Route path="/presentacion" element={<Presentacion />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/agregarProyectos" element={<AgregarProyecto />} />
          
          <Route path="/*" element={<Home />} />
        </Routes>
       </div>
      </div>
    </div>
  );
};
