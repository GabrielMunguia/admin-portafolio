import Swal from "sweetalert2";

export const alertaError = (msj) => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: msj,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const alertaSuccess = (mensaje = "Se agrego Correctamente") => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const alertaPreguntaEliminar = async (
  mensaje = "Estas seguro de eliminarlo?",
  respuesta="Se elimino el registro !",
) => {
  const resp = await Swal.fire({
    title: mensaje,
    text: "Este cambio no es reversible",
    titleText:mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si,eliminalo",
  });
  const { isConfirmed } = resp;
  if (isConfirmed) {
    alertaSuccess(respuesta);
    return true;
  }
  return false;
};


