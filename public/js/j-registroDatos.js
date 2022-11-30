
const imageInput = document.querySelector("#image-input");
const btnEnviar=document.getElementById("btn-aceptar");


btnEnviar.addEventListener("click", async() => {
 await modificarUsuario();
})

imageInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

 async function modificarUsuario() {
  
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

  if(!datos.nombre || !datos.apellidos || !datos.nacimiento || !datos.genero || !datos.peso|| !datos.altura ) {
    document.getElementById("mensaje").innerText= "*Todos lo campos son obligatorios*"
    nombre.style.borderColor="red"
    apellidos.style.borderColor="red"
    nacimiento.style.borderColor="red"
    genero.style.borderColor="red"
    peso.style.borderColor="red"
    altura.style.borderColor="red"
    return
  }

  const body = new FormData();
  Object.keys(datos).forEach(key => {
    if (datos[key]) body.append(key, datos[key]);
  })

  const resultado= await fetch("http://localhost:3000/usuarios/modificar", {
    method: 'PUT',
    body
  })
  const usuario= await resultado.json()
  localStorage.setItem("usuario", JSON.stringify(usuario))
  console.log(usuario)

  return window.location.href = 'http://localhost:3000/html/h-subHome.html'
}
