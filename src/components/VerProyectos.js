import React, { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { eliminarProyecto, getProyectos } from "../database/proyectos";
import { alertaPreguntaEliminar } from "../helpers/alertas";
import { convertSmallArray } from "../helpers/convertSmallArray";
import { types } from "../types/types";

export const VerProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [recargarTabla, setrecargarTabla] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [page, setPage] = useState(0);

let navigate = useNavigate();
  useEffect(async () => {

    const resp= await getProyectos();
    setProyectos(convertSmallArray(resp));
    setCargando(false);
  }, [recargarTabla]);

  useEffect(() => {
    
  }, [proyectos]);
  const nextPage = () => {
    if (page < proyectos.length) {
      setPage(page + 1);
    }
    return;
  };

  const lastPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
    return;
  };


  

  const eliminar=async (e)=>{
   const id = e.target.id;
  const seEliminara = await  alertaPreguntaEliminar()
  if(seEliminara){
    
   const resp= await eliminarProyecto(id);
   if (resp===401) {
    const action = {
      type: types.logout,
    };
    dispatch(action);
    return;
  }
  setrecargarTabla(!recargarTabla)
  }
  }

  const detalleProyecto=(e)=>{
    
    const id= e.target.id;

  if(id===null){
    return null
  }
  navigate("/detalleProyecto/"+id)
}
 



  return (
    <div className="d-flex justify-content-center mt-3 ">

        {cargando?<h1>Cargando...</h1>: <div className='col-12 col-xl-10 "table-responsive"'>
        <table className="table border shadow table-striped ">
          <thead className="bg-dark text-white">
            <tr>
            <th scope="col">#</th>
              <th scope="col">Nombre del proyecto</th>
              <th scope="col">Subtitulo</th>

              <th scope="col"><div className="text-center">Tecnologias</div></th>
              
              <th scope="col"><div className="d-flex justify-content-end px-5 me-5"><span className="me-3">Acciones</span></div></th>
            </tr>
          </thead>
          <tbody >
            {proyectos[page].map((proyecto, i) => {
              return (
                <tr key={i}>
                     <td>{i+1}</td>
                  <th scope="row">{proyecto.titulo}</th>
                  <td>{proyecto.subTitulo}</td>
                  <td><div className="text-center">{proyecto.tecnologias}</div></td>
                 
                  <td>
                    <div className="d-flex justify-content-end flex-wrap">
                    <button className="btn btn-primary me-3" id={proyecto.uid} onClick={detalleProyecto}>Ver mas</button>
                    
                      <button className="btn btn-danger " id={proyecto.uid}  onClick={eliminar}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex  justify-content-center mb-4 ">
          <button
            onClick={lastPage}
            disabled={page + 1 === 1}
            className=" fw-bold bg-white button__next  btn border border-2 border-dark text-dark "
          >
            {" "}
            <span className="ms-1 me-2">{"<"} </span>
            {page === 0 ? 1 : page}-{page + 1}
          </button>
          <button
            onClick={nextPage}
            disabled={page + 1 === proyectos.length}
            className=" fw-bold  bg-white button__next ms-5 btn border border-2 border-dark text-dark "
          >
        
            {page + 1 < proyectos.length ? page + 2 : proyectos.length}-{proyectos.length}{" "}
            <span className="ms-1 me-2">{">"} </span>
          </button>
        </div>
      </div>}
     
    </div>
  );
};
