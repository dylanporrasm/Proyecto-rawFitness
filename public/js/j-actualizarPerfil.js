import { formatDate } from "./utilidades.js";
const imageInput = document.querySelector("#image-input");
const btnEnviar=document.getElementById("enviar");



//GENERAR INFORMACION


function generarInformacion(usuario){
    Object.keys(usuario).forEach(key =>{
        const input= document.getElementById(key);

        if(input){
            switch(key) {
                case 'nacimiento':
                    input.value = formatDate(usuario[key]);
                    break;
                case 'foto':
                    input.src = usuario[key].secure_url || "../img/icono_equipo.png";
                    break;
                default:
                    input.value = usuario[key];
                    break;
            }
        }
    })
}


function obtenerUsuarioDelLocalStorage(){
  const usuario=JSON.parse(localStorage.getItem("usuario"))
  return usuario;
}

async function obtenerUsuario(){
  const usuarioActual = obtenerUsuarioDelLocalStorage();
  const resultado = await fetch(`http://localhost:3000/usuarios/buscar-por/${usuarioActual.correo}`);
  const usuario = await resultado.json();
  return usuario;
}


btnEnviar.addEventListener("click", async() => {
 await actualizarUsuario();
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

async function actualizarUsuario() {
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
    
    await fetch("http://localhost:3000/usuarios/modificar", {
    method: 'PUT',
    body
    })

    const usuario= await obtenerUsuario()
    generarInformacion(usuario)
  
  }

  const cargarDatos = async () => {
    const usuario = await obtenerUsuario();
    generarInformacion(usuario)
  };
  
  cargarDatos();
  