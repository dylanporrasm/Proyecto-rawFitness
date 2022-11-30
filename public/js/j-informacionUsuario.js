import { formatDate } from "./utilidades.js";


function generarInformacion(){
    const usuario=JSON.parse(localStorage.getItem("usuario"));
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

generarInformacion()