
const image_input = document.querySelector("#image-input");
const btnEnviar=document.getElementById("btn-aceptar");

btnEnviar.addEventListener("click", ()=>{
  modificarUsuario();
  
})

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

function modificarUsuario() {
  const correo=JSON.parse(localStorage.getItem("usuario")).correo
  var datos = {
    //foto: document.getElementById("foto").value,
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    nacimiento: document.getElementById("nacimiento").value,
    genero: document.getElementById("genero").value,
    peso: document.getElementById("peso").value,
    altura: document.getElementById("altura").value,
    correo

  }
  if(!datos.nombre || !datos.apellidos || !datos.nacimiento ){
    document.getElementById("mensaje").innerText="Todos los campos son requeridos"
    return
  }

  fetch("http://localhost:5000/usuarios/modificar", {
    method: 'PUT',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json',

    }

  })
  return window.location.href = 'http://localhost:5000/html/h-subHome.html'
}


  

