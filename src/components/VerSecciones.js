import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { eliminarSeccion, obtenerSecciones } from "../database/secciones";
import { alertaPreguntaEliminar } from "../helpers/alertas";
import { convertSmallArray } from "../helpers/convertSmallArray";


export const VerSecciones = () => {
  let navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const [secciones, setSecciones] = useState([]);
  const [recargarTabla, setrecargarTabla] = useState(false);
  const [page, setPage] = useState(0);
  useEffect(async () => {
    const resp = await obtenerSecciones();
  
    setSecciones(convertSmallArray(resp));
    setCargando(false)
  }, [recargarTabla]);

  const handleEditar = async (e) => {
    const id= e.target.id;

    if(id===null){
      return null
    }
    navigate("/detalleSeccion/"+id)

  };


  const eliminar = async (id) => {
    try {
      const seEliminara = await alertaPreguntaEliminar();
      if (seEliminara) {
        const resp = await eliminarSeccion(id);
       
      
        setrecargarTabla(!recargarTabla);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const nextPage = () => {
    if (page < secciones.length) {
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
                <tr >
                  <th scope="col">#</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">Descripcion</th>

                  <th scope="col">
                    <div className="d-flex justify-content-end px-5 me-5">
                      <span className="me-3">Acciones</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="fw-bold">
                {secciones[page].map((seccion, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <th scope="row">{seccion.nombre}</th>
                      <td className={seccion.status?"text-success":"text-danger"}>{seccion.status ? "Disponible" : "No disponible"}</td>

                      <td>
                        <div className="d-flex justify-content-end flex-wrap">
                          <button
                            className="btn btn-primary me-3"
                            onClick={handleEditar}
                            id={seccion.uid}

                          >
                            Editar
                          </button>

                          <button
                            className="btn btn-danger "

                            onClick={()=>{eliminar(seccion.uid)}}
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
            disabled={page + 1 === secciones.length}
            className=" fw-bold  bg-white button__next ms-5 btn border border-2 border-dark text-dark "
          >
        
            {page + 1 < secciones.length ? page + 2 : secciones.length}-{secciones.length}{" "}
            <span className="ms-1 me-2">{">"} </span>
          </button>
        </div>
          </div>
        )}
      </div>
    </div>
  );
};
