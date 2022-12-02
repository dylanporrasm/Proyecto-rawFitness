import { formatDate } from "./utilidades.js";



async function obtenerUsuario(){
    const usuarioActual = obtenerUsuarioDelLocalStorage();
    const resultado = await fetch(`http://localhost:3000/usuarios/buscar-por/${usuarioActual.correo}`);
    const usuario = await resultado.json();
    return usuario;
  }

  function obtenerUsuarioDelLocalStorage(){
    const usuario=JSON.parse(localStorage.getItem("usuario"))
    return usuario;
  }

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

const cargarDatos = async () => {
    const usuario = await obtenerUsuario();
    generarInformacion(usuario)
  };
  
  cargarDatos();
