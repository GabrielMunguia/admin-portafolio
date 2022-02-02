import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/authContext";
import { updateAccount } from "../database/login";
import { alertaError, alertaSuccess } from "../helpers/alertas";
import { useForm } from "../hooks/useForm";
import { types } from "../types/types";
import { Imagen } from "./Imagen";

export const Configuracion = () => {
  const { user } = useContext(AuthContext);
  const [editar, seteditar] = useState(false);
  const [refrescar, setrefrescar] = useState(false);
  const [actualizarPassword, setActualizarPassword] = useState(false);
 const [nombreOriginal, setnombreOriginal] = useState("");
 const { dispatch } = useContext( AuthContext )
  const [formulario, setFormulario] = useForm({
    nombre: "",
    newPassword: "",
  });
  const [imagen, setimagen] = useState(null);
  const { usuario } = user;


  useEffect(() => {
    setFormulario({ target: { name: "nombre", value: usuario.nombre } });
    setnombreOriginal(usuario.nombre)
  }, []);



  const handleEditar = () => {
    seteditar(!editar);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { value: password } = await Swal.fire({
      title: "Ingresa el password actual",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "password",
      inputAttributes: {
        maxlength: 10,
        autocapitalize: "off",
        autocorrect: "off",
      },
    });

    if (password) {

    let data = {};
    data.password=password;

    if (formulario.nombre !== nombreOriginal) {
      data.nombre = formulario.nombre;
     
    }


    if(formulario.newPassword!==""){
      data.newPassword=formulario.newPassword;
    }


 

    const resp = await updateAccount( data);
    if (resp.msj || resp.errors) {
      return alertaError(resp.msj || resp.errors[0].msg);
    }


  const nuevoUsuario= {...user,usuario:resp.payload.usuario};

    if(resp.status){
      const action = {
        type: types.login,
        payload: nuevoUsuario,
      };
      dispatch(action);
    }

    seteditar(!editar);
    setrefrescar(!refrescar);


    setFormulario({ target: { name: "newPassword", value:"" } });
    setActualizarPassword(false);

    alertaSuccess("Se actualizo correctamente");
    }
  };

  const handleImagen =async  () => {
    const { value: password } = await Swal.fire({
      title: "Ingresa el password actual",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "password",
      inputAttributes: {
        maxlength: 10,
        autocapitalize: "off",
        autocorrect: "off",
      },
    });

    if (password) {

      
      const { value: file } = await Swal.fire({
        title: "Seleccione la imagen",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "Upload your profile picture",
        },
      });
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = async (e) => {
          const data = {
            archivo: file,
            password
          };
  
      
  
          const resp = await updateAccount(data );
       
          if (resp.msj || resp.errors) {
            return alertaError(resp.msj || resp.errors[0].msg);
          }
          const nuevoUsuario= {...user,usuario:resp.payload.usuario};

          if(resp.status){
            const action = {
              type: types.login,
              payload: nuevoUsuario,
            };
            dispatch(action);
          }
      
          setrefrescar(!refrescar);
          
            if(resp.status){
      const action = {
        type: types.login,
        payload: nuevoUsuario,
      };
      dispatch(action);
    }

        
          Swal.fire({
            title: "Se agrego la imagen correctamente!",
            imageUrl: e.target.result,
            imageAlt: "The uploaded picture",
          });
        };
        reader.readAsDataURL(file);
      }

    }



   

  };

  const eliminarImagen = () => {};
  const handleActualizarPassword=()=>{
    setActualizarPassword(!actualizarPassword)
    if(!actualizarPassword==false){
      setFormulario({ target: { name: "newPassword", value:"" } });
    }
  }
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center mt-4">
        <div className=" col-10 col-xl-8 mb-4 d-flex justify-content-end">
          <button
            onClick={handleEditar}
            className={` fw-bold  mb-1 btn px-4 ${
              editar ? "btn-outline-danger" : "btn-outline-primary"
            }`}
          >
            {editar ? "Desactivar edicion" : "Activar edicion"}
          </button>
        </div>
        <div className="card col-10 col-xl-8 shadow shadow-md">
          <div className="card-header bg-dark text-white">Informacion </div>
          <form onSubmit={handleSubmit} className="card-body px-4">
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className={"form-control"}
                name="nombre"
                id="titulo"
                value={formulario.nombre}
                onChange={setFormulario}
                disabled={!editar}
                required={true}
              />
            </div>
            {editar && (
              <div>
                <button
                  type="button"
                  onClick={handleActualizarPassword}
                  className={`btn mb-4 ${actualizarPassword ? "btn-outline-danger" : "btn-outline-primary"}`}
                >
                  {!actualizarPassword?"Actualizar password":"Cancelar editar Password"}
                </button>
              </div>
            )}

            {editar && actualizarPassword && (
              <div className="mb-3">
                <label htmlFor="Descripcion" className="form-label">
                  Nuevo password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  id="Descripcion"
                  value={formulario.newPassword}
                  onChange={setFormulario}
                  autoComplete="false"
                  disabled={!editar}
                />
              </div>
            )}
            {editar && (
              <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-primary">
                  ACTUALIZAR
                </button>
              </div>
            )}

            <div className="d-flex justify-content-end mt-4"></div>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <div className="card col-10 col-xl-8 shadow shadow-md">
          <div className="card-header bg-dark text-white">IMAGENE </div>
          <div className="card-body px-4">
            <div className="d-flex justify-content-center flex-column align-items-center">
              {editar && (
                <div className="d-flex justify-content-center mt-4 position-relative mb-5">
                  <button
                    onClick={handleImagen}
                    type="button"
                    className="btn btn-primary fs-6"
                  >
                    {usuario.img.length <= 0
                      ? "SUBIR IMAGEN"
                      : "REMPLAZAR IMAGEN"}
                  </button>
                </div>
              )}
              {usuario.img.length > 0 && (
                <Imagen
                  editar={editar}
                  src={usuario.img}
                  eliminar={eliminarImagen}
                />
              )}
            </div>

            <div className="d-flex justify-content-end mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
