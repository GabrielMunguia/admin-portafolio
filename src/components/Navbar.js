import React from "react";
import menu from "../assets/img/menu.png";
import "../assets/css/components/navbar.css";
export const Navbar = ({ estadoMenu, setEstadoMenu }) => {
  const handleMenu = () => {
    setEstadoMenu(!estadoMenu);
  };

  return (
    <div>
      <nav className="navbar  navbar-expand-lg navbar-light bg-white border shadow shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img  onClick={handleMenu} className=" p-1 navbar-icon" src={menu} alt="" />
          </a>
         
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
        </div>
      </nav>
    </div>
  );
};
