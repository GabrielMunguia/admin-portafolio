import React, { useContext, useState } from "react";
import { loginUsuario } from "../database/login";
import "../assets/css/pages/login.css";
import logo from "../assets/img/logo.svg";
import wave from "../assets/img/wave.svg";
import { useForm } from "../hooks/useForm";
import { types } from '../types/types';
import { AuthContext } from '../auth/authContext';
import { Navigate } from 'react-router-dom';

const initialState = {
  correo: "",
  password: "",
};

export const Login = () => {


  const [cargando, setCargando] = useState(false);
  const [formulario, handleInputChange] = useForm(initialState);
  const [error, setError] = useState(null);
  const { dispatch } = useContext( AuthContext )

  const handleSubmit = async (e) => {
    e.preventDefault();
 try {
  setCargando(true);

  const resp = await loginUsuario(formulario.correo, formulario.password);


  setCargando(false);

  if(resp.msj||resp.errors){
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 2000);
  }

  

if(resp.token){
const action = {
  type: types.login,
  payload: resp,
};
dispatch(action);



}
   
 } catch (error) {
   console.log(error)
  setError(true)


  setTimeout(() => {
    setError(false)
  }, 2000);
  setCargando(false);
 }

  };

  return (
    <div className="login__backgroud min-vh-100 d-flex justify-content-center align-items-center ">
      <div className=" bg-dark p-0 shadow shadow-lg col-11 col-sm-10 col-md-8 col-xl-4 col-xxl-3  d-flex flex-column justify-content-center align-items-center rounded">
        <div className="d-flex justify-content-center mt-2">
          <img className="col-6" src={logo} alt="wave m-0" />
        </div>

        <h1 className="mt-5 text-white">ADMIN PANEL</h1>

        <form
          onSubmit={handleSubmit}
          className=" col-7  m-2 d-flex flex-column justify-content-center align-items-center mb-5 position-relative"
        >
          <input
            type="email"
            className="form-control m-3 "
            placeholder="email"
            required
            name="correo"
            value={formulario.correo}
            onChange={handleInputChange}
          />
          <input
            type="password"
            className="form-control m-3"
            placeholder="password"
            required
            name="password"
            value={formulario.password}
            onChange={handleInputChange}
          />

          <div className="mb-3 mt-2 d-flex justify-content-center">
            {error ===true && (
              <div className="text-danger position-absolute col-12 ">
                Los datos ingresados son invalidos
              </div>
            )}
          </div>
          <button disabled={cargando} className=" col-6 mt-5 btn btn-primary" type="submit">
            {cargando?"LOADING....":"LOGIN"}
          </button>
        </form>

        <img src={wave} alt="wave m-0" />
      </div>
    </div>
  );
};
