import { generarInformacion } from "./utilidades.js";
import { obtenerUsuarioDelLocalStorage, obtenerUsuario, actualizarUsuario } from "./servicios.js";
const imageInput = document.querySelector("#image-input");
const btnEnviar=document.getElementById("enviar");

btnEnviar.addEventListener("click", async() => {
 await modificarUsuario();
})

imageInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});


/*async function mensajeU(){
    //alert("Perfil correctamente actualizado")
     document.getElementById("mensaje").innerText= "*Datos actualizados*"
 }*/

async function modificarUsuario() {
    const correo = obtenerUsuarioDelLocalStorage().correo
    const datos = {
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      nacimiento: document.getElementById("nacimiento").value,
      genero: document.getElementById("genero").value,
      peso: document.getElementById("peso").value,
      altura: document.getElementById("altura").value,
      foto_usuario: imageInput?.files[0],
      correo
    }
    const body = new FormData();
    Object.keys(datos).forEach(key => {
      if (datos[key]) body.append(key, datos[key]);
    })

    const usuario = await actualizarUsuario(body);
    generarInformacion(usuario)
}

const cargarDatos = async () => {
  const usuario = await obtenerUsuario();
  generarInformacion(usuario)
}

cargarDatos();
