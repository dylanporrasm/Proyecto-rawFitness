function generarInformacion(){
    const usuario=JSON.parse(localStorage.getItem("usuario"));
    Object.keys(usuario).forEach(key =>{
        const input= document.getElementById(key);

        if(input){
            input.value = key==="nacimiento" ? formatDate(usuario[key]) : usuario[key];
        }
    })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
}


generarInformacion()