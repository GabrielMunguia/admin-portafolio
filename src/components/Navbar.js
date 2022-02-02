import React, { useContext } from "react";
import menu from "../assets/img/menu.png";
import "../assets/css/components/navbar.css";
import { AuthContext } from "../auth/authContext";
import { NavbarPerfil } from "./NavbarPerfil";
export const Navbar = ({ estadoMenu, setEstadoMenu }) => {
  const { user } = useContext(AuthContext);
const {usuario}=user;
console.log(usuario)
  const handleMenu = () => {
    setEstadoMenu(!estadoMenu);
  };

 

  return (
    <div>
      <nav className="navbar position-relative overflow-x-hidden navbar-fixed navbar-expand-lg navbar-light bg-white border shadow shadow-sm ">
        <div className=" d-flex col-12  justify-content-between ">
          <div onClick={handleMenu}  className="navbar-brand ">
            <img   className=" p-1 navbar-icon" src={menu} alt="" />
          </div>
          <div className="col-11   d-flex  align-items-center justify-content-end px-4 px-xl-0 ">
         
          <div className="col-1 me-5">
           <NavbarPerfil img={usuario.img}/>
          </div>
            
          </div>
    
          <div>
           
          </div>
        </div>
      </nav>
    </div>
  );
};
