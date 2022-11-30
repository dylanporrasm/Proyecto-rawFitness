import { formatDate } from "./utilidades.js";

function generarInformacion(){
    const usuario=JSON.parse(localStorage.getItem("usuario"));
    Object.keys(usuario).forEach(key =>{
        const input= document.getElementById(key);

        if(input){
            input.value = key==="nacimiento" ? formatDate(usuario[key]) : usuario[key];
        }
    })
}

generarInformacion()