const cerrarSesionBtn = document.getElementById('cerrar-sesion');

function cerrarSesion(){
    localStorage.removeItem("usuario") //Se remueve el usuario del almacenamiento Local
    
}

cerrarSesionBtn.addEventListener('click', cerrarSesion);
