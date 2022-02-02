import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { agregarImagenProyecto, eliminarImagenProyecto, obtenerImagesProyecto } from '../database/proyectos';
import { alertaError, alertaPreguntaEliminar, alertaSuccess } from '../helpers/alertas';


import { Imagen } from './Imagen';

export const ImagenesProyecto = ({editar,idProyecto}) => {
  const [imagenes, setImagenes] = useState([]);
  const [refrescar, setrefrescar] = useState(false);


useEffect(async () => {
  console.log('1')
    const resp= await   obtenerImagesProyecto(idProyecto)
    setImagenes(resp.imagenes);
}, [refrescar]);


 const subirImagen = async () => {
  const { value: file } = await Swal.fire({
    title: "Seleccione la imagen",
    input: "file",
    inputAttributes: {
      accept: "image/*",
      "aria-label": "Upload your profile picture",
    },
  });
  
  if ( file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const img = await agregarImagenProyecto(file, idProyecto);
        
        if(img.status){
          setrefrescar(!refrescar)
         
           Swal.fire({
            title: "Se subio la imagen correctamente",
            imageUrl: e.target.result,
            imageAlt: "The uploaded picture",
          });
        }else{

          alertaError("Ocurrio un error al subir la imagen")
        }
        

      

       
      } catch (error) {
        console.log(error);
        return false;
      }
    };
    reader.readAsDataURL(file);
  }

};



const  handleImagen=async ()=>{
 await  subirImagen();
  }

  const eliminarImagen=async(id)=>{
    
 try {
  const seEliminara=await alertaPreguntaEliminar("Estas seguro de eliminar la imagen?");

 if(seEliminara===true){
  const img =await eliminarImagenProyecto(id);

  if(img.status){

    setrefrescar(!refrescar)
  }
 }
  
 } catch (error) {
   console.log(error)
 }

  }



  
  return <div>
        <div className="d-flex justify-content-center mt-4">
            <div className="card col-11 col-10 col-xl-8  shadow shadow-md">
              <div className="card-header bg-dark text-white">IMAGENES</div>
              <div className="card-body px-4">
                <div>
                  <h4 className="text-center mt-4 mb-3">IMAGENES</h4>
                  {editar && (
                    <div className="d-flex justify-content-center mt-4 position-relative mb-5">
                        <button onClick={handleImagen} className='btn btn-primary'>SUBIR IMAGEN</button>

                       
                       
                    </div>
                  )}

                


                  <div className="d-flex flex-wrap justify-content-center position-relative mb-4">
                
                    {imagenes?.map((img,i) => {
                      return (
                    
                          <Imagen  key={i} editar={editar} src={img.img} eliminar={async ()=>{ await eliminarImagen(img.uid)}}/>
                  
                      );
                    })}
                  </div>

              
                </div>
              </div>
            </div>
          </div>
  </div>;
};
