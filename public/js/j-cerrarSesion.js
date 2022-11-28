const cerrarSesionBtn = document.getElementById('cerrar-sesion');

function cerrarSesion(){
    localStorage.removeItem("usuario")
}

cerrarSesionBtn.addEventListener('click', cerrarSesion);
