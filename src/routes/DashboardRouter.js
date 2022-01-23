import React,{useState} from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";

import { Presentacion } from './../components/Presentacion';
import { Sidebar } from './../components/Sidebar';
import Cursos from './../components/Cursos';

export const Dashboard = () => {

  const [estadoMenu, setEstadoMenu] = useState(true);

  return (
    <div className="d-flex">
      <Sidebar estadoMenu={estadoMenu} />
      <div className="w-100">
     <Navbar estadoMenu={estadoMenu} setEstadoMenu={setEstadoMenu} />
        <Routes>
          <Route path="/presentacion" element={<Presentacion />} />
          <Route path="/cursos" element={<Cursos />} />
          
          <Route path="/*" element={<Presentacion />} />
        </Routes>
      </div>
    </div>
  );
};
