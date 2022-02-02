import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProyecto } from "../database/proyectos";
import { ImagenesProyecto } from "./ImagenesProyecto";
import { InformacionProyecto } from "./InformacionProyecto";
import { VideosProyectos } from "./VideosProyectos";

export const DetalleProyecto = () => {
  const [proyecto, setProyecto] = useState({});

  const [editar, setEditar] = useState(false);
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  const handleEditar = () => {
    setEditar(!editar);
  };

  useEffect(async () => {
    let isMounted = true;
    if (isMounted) {
      try {
        const resp = await obtenerProyecto(id);
        if (resp.status === false) {
          return setError(true);
        }
        setProyecto(resp);

        setCargando(false);
      } catch (error) {
        setError(true);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {}, [proyecto]);

  return (
    <div>
      {error ? (
        <h1 className="text-center">
          OCURIO UN ERROR, VERIFIQUE EL ID DEL PROYECTO
        </h1>
      ) : cargando === true ? (
        <h1 className="text-center"> Cargando</h1>
      ) : (
        <div className=" py-2">
          
          <div className="d-flex justify-content-center">
          <div className="card col-11 col-10 col-xl-8  border-0 bg-transparent ">
          <div className="d-flex justify-content-end    ">
            <button
              onClick={handleEditar}
              className={` fw-bold  mb-1 btn  px-4 ${
                editar ? "btn-outline-danger" : "btn-outline-primary"
              }`}
            >
              {editar ? "Desactivar edicion" : "Activar edicion"}
            </button>
          </div>
          </div>
          </div>

          <div>
            <InformacionProyecto
              editar={editar}
              proyecto={proyecto}
              setEditar={setEditar}
            />
            <ImagenesProyecto editar={editar} idProyecto={id} />
            <VideosProyectos editar={editar} idProtecto={id} />
          </div>
        </div>
      )}
    </div>
  );
};
