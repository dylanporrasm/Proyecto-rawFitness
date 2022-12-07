const ayuno = require("../../schemas/ayuno");

/*document.querySelectorAll(".hora").forEach(el => el.addEventListener("keypress", setHora));
function setHora(e) {
    e.preventDefault();
    if (this.value.length==2) {
        this.value+=":";
    }
    // verificamos que el valor no supere los 5 caracteres,
    // que sea un numero y que no supere las 24:59
    if (this.value.length>=5 || /[0-9]/.test(e.key)==false ||
        (this.value.length==0 && e.key>2) ||
        (this.value.length==1 && e.key>3) ||

    ) {
        return;
    }
    this.value+=e.key;}*/
const btnEnviar=document.getElementById("registrar");



btnEnviar.addEventListener("click", async() => {
    await agregarAyuno();
   })




   async function agregarAyuno() {
  
    const correo = JSON.parse(localStorage.getItem("ayuno")).correo
    const datos = {
      tipo: document.getElementById("tipo").value,
      horaInicio: document.getElementById("inicio").value,
      horaFinal: document.getElementById("fin").value,
      fecha: document.getElementById("fecha").value,
      correo
    }
  
    if(!datos.tipo || !datos.horaInicio || !datos.horaFinal || !datos.fecha) {
      document.getElementById("mensaje").innerText= "*campos  obligatorios*"
      tipo.style.borderColor="red"
      horaInicio.style.borderColor="red"
      horaFinal.style.borderColor="red"
      fecha.style.borderColor="red"
      return
    }
  
    const body = new FormData();
    Object.keys(datos).forEach(key => {
      if (datos[key]) body.append(key, datos[key]);
    })
  
    const resultado= await fetch("http://localhost:3000/ayunos/modificar", {
      method: 'PUT',
      body
    })
    const ayuno= await resultado.json()
    localStorage.setItem("ayuno", JSON.stringify(ayuno))
    console.log(ayuno)
  
  }
  