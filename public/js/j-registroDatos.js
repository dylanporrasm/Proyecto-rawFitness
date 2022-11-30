
const imageInput = document.querySelector("#image-input");
const btnEnviar=document.getElementById("btn-aceptar");

btnEnviar.addEventListener("click", () => {
  modificarUsuario();
})

imageInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

function modificarUsuario() {
  const correo = JSON.parse(localStorage.getItem("usuario")).correo

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

  if(!datos.nombre || !datos.apellidos || !datos.nacimiento || !datos.genero || !datos.peso|| !datos.altura) {
    document.getElementById("mensaje").innerText= "Todos lo campos son obligatorios"
    return
  }

  const body = new FormData();
  Object.keys(datos).forEach(key => {
    if (datos[key]) body.append(key, datos[key]);
  })

  fetch("http://localhost:3000/usuarios/modificar", {
    method: 'PUT',
    body
  })

  return window.location.href = 'http://localhost:3000/html/h-subHome.html'
}
