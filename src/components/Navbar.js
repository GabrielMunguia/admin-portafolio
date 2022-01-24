import React from "react";
import menu from "../assets/img/menu.png";
import "../assets/css/components/navbar.css";
export const Navbar = ({ estadoMenu, setEstadoMenu }) => {
  const handleMenu = () => {
    setEstadoMenu(!estadoMenu);
  };

  return (
    <div>
      <nav className="navbar  navbar-fixed navbar-expand-lg navbar-light bg-white border shadow shadow-sm ">
        <div className="container-fluid">
          <div onClick={handleMenu}  className="navbar-brand ">
            <img   className=" p-1 navbar-icon" src={menu} alt="" />
          </div>
         
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
        </div>
      </nav>
    </div>
  );
};
