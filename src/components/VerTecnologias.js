import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/components/verTecnologias.css'
import { AuthContext } from "../auth/authContext";

import { eliminarTecnologia, obtenerTecnologias } from "../database/tecnologia";
import { alertaPreguntaEliminar } from "../helpers/alertas";
import { convertSmallArray } from "../helpers/convertSmallArray";
import { types } from "../types/types";

export const VerTecnologias = () => {
  const [cargando, setcargando] = useState(true);
  const [recargarTabla, setrecargarTabla] = useState(false);
  const [page, setPage] = useState(0);
  
  const [tecnologias, setTecnologias] = useState([]);
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();
  useEffect(async () => {
    const resp = await obtenerTecnologias();

    setTecnologias(convertSmallArray(resp.payload.tecnologias));
    setcargando(false);
  }, [recargarTabla]);


  

  useEffect(() => {
    console.log(tecnologias);
  }, [tecnologias]);

  const eliminar = async (id) => {
    try {
      const seEliminara = await alertaPreguntaEliminar();
      if (seEliminara) {
        const resp = await eliminarTecnologia(id);
       
        if (resp === 401) {
          const action = {
            type: types.logout,
          };
          dispatch(action);
          return;
        }
        setrecargarTabla(!recargarTabla);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const detalleCaracteristica=(e)=>{
    const id= e.target.id;

    if(id===null){
      return null
    }
    navigate("/detalleTecnologia/"+id)
  }

  const nextPage = () => {
    if (page < tecnologias.length) {
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
  return (
    <div>
      <div className="d-flex justify-content-center mt-3 ">
        {cargando ? (
          <h1>Cargando...</h1>
        ) : (
          <div className='col-12 col-xl-10 "table-responsive"'>
            <table className="table border shadow table-striped  align-middle">
              <thead className="bg-dark text-white">
                <tr>
                  <th scope="col"  className="text-start">#</th>
                  <th scope="col" className="col-4 text-start" >Titulo</th>
                  <th scope="col"  className="col-4 text-start">Imagen</th>

                  <th scope="col">
                    <div className="d-flex justify-content-end px-5 me-5">
                      <span className="me-3">Acciones</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="fw-bold">
                {tecnologias[page].map((tecnologia, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <th scope="row">{tecnologia.titulo}</th>
                      <td>
                          <div className="tecnologia_contenedor">
                              <img className="col-12" src={tecnologia.img}/>
                          </div>
                          
                      </td>

                      <td>
                        <div className="d-flex justify-content-end flex-wrap">
                          <button
                            className="btn btn-primary me-3"
                            onClick={detalleCaracteristica}
                            id={tecnologia.uid}
                          >
                            Ver mas
                          </button>

                          <button
                            className="btn btn-danger "
                            
                            onClick={()=>{eliminar(tecnologia.uid)}}
                          >
                            Eliminar
                          </button>
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
            disabled={page + 1 === tecnologias.length}
            className=" fw-bold  bg-white button__next ms-5 btn border border-2 border-dark text-dark "
          >
        
            {page + 1 < tecnologias.length ? page + 2 : tecnologias.length}-{tecnologias.length}{" "}
            <span className="ms-1 me-2">{">"} </span>
          </button>
        </div>
          </div>
        )}
      </div>
    </div>
  );
};
