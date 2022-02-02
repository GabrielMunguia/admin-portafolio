import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { agregarVideo, eliminarVideos, obtenerVideosProyecto } from "../database/proyectos";
import { alertaError, alertaPreguntaEliminar, alertaSuccess } from "../helpers/alertas";

export const VideosProyectos = ({ editar,idProtecto }) => {

 const [videos, setVideos] = useState([]);
 const [refrescar, setRefrescar] = useState(false);


 useEffect(async () => {
  const data = await obtenerVideosProyecto(idProtecto);
  setVideos(data.videos)
 }, [refrescar]);

 useEffect(() => {

 }, [videos]);

 const agregarVideoProyecto=async ()=>{
  const { value: url } = await Swal.fire({
    input: 'url',
    inputLabel: 'URL DEL VIDEO',
    inputPlaceholder: 'Ingrese la URL',
    validationMessage:"La URL no es valida"
  })




  
  if (url) {
   const resp = await agregarVideo(url,idProtecto)
   try {
     if(resp.status){
       alertaSuccess("El video se agrego correctamente")
     }
     setRefrescar(!refrescar);
     
   } catch (error) {
    alertaError("Ocurrio un error al agregar el video")
   }
  }
 }
 
   const eliminarVideo=async(id)=>{
    
 try {
  const seEliminara=await alertaPreguntaEliminar("Estas seguro de eliminar el video?");

 if(seEliminara===true){
  const img =await eliminarVideos(id);

  if(img.status){

    setRefrescar(!refrescar)
  }
 }
  
 } catch (error) {
   console.log(error)
 }

  }




  return (
    <div>
      <div className="d-flex justify-content-center mt-4">
        <div className="card col-11 col-10 col-xl-8  shadow shadow-md">
          <div className="card-header bg-dark text-white">VIDEOS</div>
          <div className="card-body px-4">
            <div>
              <h4 className="text-center mt-4 mb-3">VIDEOS</h4>
              {editar && (
                <div className="d-flex justify-content-center mt-4 position-relative mb-5">
                  <button onClick={agregarVideoProyecto} className="btn btn-primary">AGREGAR VIDEO</button>
                </div>
              )}

              <div className="d-flex flex-wrap justify-content-evenly position-relative px-5">
                

             

              {videos.length>0&&videos.map((video,i)=> <div     key={i} className="m-1 mb-4 d-flex overflow-hidden">
                <iframe
            
                  width="500"
                  height="300"
                  src={video.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
               {editar&& <button style={{height:300}} className="btn btn-danger" onClick={async ()=>{ await eliminarVideo(video.uid)}}>Eliminar</button>}
                </div>)
                
                }

                

                
              





            


               
                
              </div>

              <div className="d-flex"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
