import React, { useEffect, useState } from 'react';
import { useForm } from './../hooks/useForm';
import { agregarProyecto } from './../database/proyectos';




const initialState={
  titulo:"",
  subtitulo:"",
  descripcion:"",
  sitio:"",
  tecnologias:""
 
}

export const AgregarProyecto = () => {

  const [formulario,setFormulario]=useForm(initialState);
  const [archivos,setArchivos]=useState([])

  const [videos,setVideos]=useState([])

  const [lstVideos,setlstVideos]=useState()

  // const {titulo,subtitulo,descripcion,sitio,tecnologias}=formulario;

  const handleSubmit=async (e)=>{
    e.preventDefault();
    // await agregarProyecto(titulo,subtitulo,descripcion,sitio,tecnologias);
    console.log(formulario)
 

  }

  const handleFilesChange=(e)=>{
  
    setArchivos(e.target.files)
  }


  useEffect(() => {
    console.log(archivos[0])
   console.log(archivos)
   console.log('xxx')
  }, [archivos]);
  



  return <div className="d-flex justify-content-center mt-4">
      <div className="card col-10 col-xl-6 shadow shadow-md">
  <div className="card-header bg-primary text-white">
  Agregar Proyecto
  </div>
  <form onSubmit={handleSubmit} className="card-body px-4">
  <div className="mb-3">
    <label htmlFor="titulo" className="form-label">Titulo</label>
    <input type="text" className="form-control" name="titulo" id="titulo" value={formulario.titulo} onChange={setFormulario} autoComplete='false'  require={"true"}/>
  </div>

  <div className="mb-3">
    <label htmlFor="subTitulo" className="form-label">Subtitulo</label>
    <input type="text" className="form-control" name="subtitulo" id="subtitulo" value={formulario.subtitulo} onChange={setFormulario} autoComplete='false'  require={"true"}/>
  </div>

  <div className="mb-3">
    <label htmlFor="Descripcion" className="form-label">Descripcion</label>
    <input type="text" className="form-control" name="descripcion" id="Descripcion" value={formulario.descripcion} onChange={setFormulario} autoComplete='false' require={"true"}/>
  </div>

  <div className="mb-3">
    <label htmlFor="sitio" className="form-label">Sitio web </label>
    <input type="text" className="form-control" name="sitio" id="sitio"   value={formulario.sitio} onChange={setFormulario} autoComplete='false' />
  </div>


  <div className="mb-3">
    <label htmlFor="Tecnologias" className="form-label">Tecnologias</label>
    <input type="text" className="form-control" name="tecnologias" id="Tecnologias" value={formulario.tecnologias} onChange={setFormulario} require={"true"} autoComplete='false'/>
  </div>

  <div className="mb-3">
    <label htmlFor="fotos" className="form-label">Imagenes</label>
    <input type="file" className="form-control" id="fotos" onChange={handleFilesChange} multiple="multiple"  />
  </div>


  <div className="mb-3">
    <label htmlFor="Videos" className="form-label" autoComplete='false'>URL Video</label>
    <input type="text" className="form-control"/>
  </div>




  
    <div className="d-flex justify-content-end mt-4">
    <button  className="btn btn-primary">Siguiente</button>
    </div>
  </form>
</div>
  </div>;
};
