const btnEnviar=document.getElementById("enviar");
const mensaje=document.getElementById("mensaje");

async function obtenerUsuario(){
    const correo=document.getElementById("correo").value;
    const resultado = await fetch(`http://localhost:3000/usuarios/buscar-por/${correo}`);
    const usuario = await resultado.json();
    return usuario;
}

btnEnviar.addEventListener("click", async function(evento) {
    evento.preventDefault();
    const usuario = await obtenerUsuario();
    if (usuario) {
        if (usuario?.correo) {
            localStorage.setItem("usuario", JSON.stringify(usuario));//Se envia al usuario en el almacenamiento local
            if (usuario?.nombre && usuario?.apellidos && usuario?.altura && usuario?.peso ) { 
                return window.location.href = 'http://localhost:3000/html/h-subHome.html'
            } else {
                return window.location.href = 'http://localhost:3000/html/h-registroDatos.html'
            }
        }

        if (usuario?.mensaje) {
            mensaje.innerText = usuario.mensaje;//mensaje de usuario no encontrado en inicio de sesion
        }
    } else {
        mensaje.innerText = "Error al iniciar sesion";
    }
})