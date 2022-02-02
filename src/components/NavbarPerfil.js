import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/components/navbarPerfil.css'
import { AuthContext } from '../auth/authContext';
import { types } from '../types/types';
export const NavbarPerfil = ({img}) => {

  const [menuActivo, setmenuActivo] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate= useNavigate();

  const handleLogout = () => {
    const action = {
      type: types.logout,
    };
    dispatch(action);
  };
  const handleClick=()=>{
    setmenuActivo(!menuActivo)
    
  
  }

  const handleConfing=()=>{
navigate('/configuracion');
  }


  


  return <div className='position-relative d-flex  justify-content-center me-5 me-xl-0'>
    
   <div className='col-5  '> <img onClick={handleClick} className='navbar_perfil_img' src={img}/></div>
  {menuActivo&& <div  className='navbar_perfil_submenu '>
     <div  className='navbar_perfil_opc' >
       <div onClick={handleConfing} className=''> <i className="fas fa-user-circle me-1 "></i> Configurar Cuenta</div>
      
       <div onClick={handleLogout}>  <i className="fas fa-sign-out-alt me-1 "></i>Cerrar Session</div>
     </div>
   </div>}
  </div>;
};
