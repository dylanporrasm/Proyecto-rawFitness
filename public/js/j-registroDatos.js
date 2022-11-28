
const image_input = document.querySelector("#image-input");
const btnEnviar=document.getElementById("btn-aceptar");

btnEnviar.addEventListener("click", ()=>{
  modificarUsuario();
  return window.location.href = 'http://localhost:5000/html/h-subHome.html'

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

  fetch("http://localhost:5000/usuarios/modificar", {
    method: 'PUT',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json',

    }
  })
<<<<<<< HEAD
}

/*btnEnviar.addEventListener("click", async function(evento) { 
  evento.preventDefault();
  const usuario = await obtenerUsuario();
  if (usuario?.nombre && usuario?.altura && usuario?.peso) {
      return window.location.href = 'http://localhost:5000/html/h-subHome.html'
  }

  if (usuario?.correo) {
      return window.location.href = 'http://localhost:5000/html/h-registroDatos.html'
  }

  mensaje.innerText = usuario?.mensaje
})*/
=======
}
>>>>>>> d6a3417c6a1548fab41850c82d27b31363c2fba9
