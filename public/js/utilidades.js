
//CAMBIO FORMATO DE FECHA
export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function generarInformacion(usuario){
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

export function redireccionar(url) {
    return window.location.href = `http://localhost:3000/html/${url}`;
}
