import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getCaracteristica } from "../database/caracteristicas";
import { InformacionCaracteristica } from "./InformacionCaracteristica";

export const DetalleCaracteristica = () => {
  const [caracteristica, setCaracteristica] = useState({});
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [refrescar, setRefrescar] = useState(false);
  const { id } = useParams();
  const [editar, setEditar] = useState(false);
  useEffect(() => {
   
  }, [caracteristica]);

  useEffect(async () => {
    try {
      const resp = await getCaracteristica(id);
      if (resp.status === false) {
        return setError(true);
      }
      setCaracteristica(resp.payload.caracteristica);

      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  }, [refrescar]);

  const handleEditar = () => {
    setEditar(!editar);
  };

  return (
    <div>
      {error ? (
        "Ocurrio un error verifique el id "
      ) : cargando ? (
        "Cargando..."
      ) : (
        <div >
          <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-end     col-10 col-xl-8 ">
            <button
              onClick={handleEditar}
              className={` fw-bold  mb-1 btn px-4 ${
                editar ? "btn-outline-danger" : "btn-outline-primary"
              }`}
            >
              {editar ? "Desactivar edicion" : "Activar edicion"}
            </button>
          </div>
          </div>
          <InformacionCaracteristica
            caracteristica={caracteristica}
            editar={editar}
            setRefrescar={setRefrescar}
            refrescar={refrescar}
            setEditar={setEditar}
          />
        </div>
      )}
    </div>
  );
};
