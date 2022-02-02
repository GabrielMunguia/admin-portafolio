import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { eliminarInformacionPersonal, obtenerInformacionPersonales } from "../database/informacionPersonal";
import { alertaPreguntaEliminar } from "../helpers/alertas";
import { types } from "../types/types";

export const VerinformacionPersonal = () => {
  const [cargando, setcargando] = useState(true);
  const [recargarTabla, setrecargarTabla] = useState(false);
  const [infPersonal, setInfPersonal] = useState([]);
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();
  useEffect(async () => {
    const resp = await obtenerInformacionPersonales();

    setInfPersonal(resp.payload.informacionPersonal);
    setcargando(false);
  }, [recargarTabla]);


  

  useEffect(() => {
    console.log(infPersonal);
  }, [infPersonal]);

  const eliminar = async (id) => {
    try {
      const seEliminara = await alertaPreguntaEliminar();
      if (seEliminara) {
        const resp = await eliminarInformacionPersonal(id);
       
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
    navigate("/detalleInformacionPersonal/"+id)
  }

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
              <tbody >
                {infPersonal.map((caracteristica, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <th scope="row">{caracteristica.titulo}</th>
                      <td>{caracteristica.descripcion}</td>

                      <td>
                        <div className="d-flex justify-content-end flex-wrap">
                          <button
                            className="btn btn-primary me-3"
                            onClick={detalleCaracteristica}
                            id={caracteristica.uid}
                          >
                            Ver mas
                          </button>

                          <button
                            className="btn btn-danger "
                            
                            onClick={()=>{eliminar(caracteristica.uid)}}
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
          </div>
        )}
      </div>
    </div>
  );
};
