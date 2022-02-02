import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { obtenerTecnologia } from "../database/tecnologia";

import { InformacionTecnologia } from "./InformacionTecnologia";

export const DetalleTecnologia = () => {
  const [tecnologia, setTecnologia] = useState({});
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [refrescar, setRefrescar] = useState(false);
  const { id } = useParams();
  const [editar, setEditar] = useState(false);
  useEffect(() => {
   
  }, [tecnologia]);

  useEffect(async () => {
    try {
      const resp = await obtenerTecnologia(id);
      if (resp.status === false) {
        return setError(true);
      }
      setTecnologia(resp.payload.tecnologia);

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
          <InformacionTecnologia
            tecnologia={tecnologia}
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
