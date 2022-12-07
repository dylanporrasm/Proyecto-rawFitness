

const imageInput = document.querySelector("#image-receta");
const btnEnviar=document.getElementById("btn-aceptar");


btnEnviar.addEventListener("click", async() => {
 await modificarRecetas();
})

imageInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

 async function modificarRecetas() {
  const correo = JSON.parse(localStorage.getItem("receta")).correo//se obtiene el usuario por medio del almacenamiento local
  const datos = {
    nombre: document.getElementById("nombre").value,
    ingredientes: document.getElementById("ingredientes").value,
    pasos: document.getElementById("pasos").value,
    horaComida: document.getElementById("horaComida").value,
    tipoComida: document.getElementById("tipoComida").value,
    foto_receta: imageInput?.files[0],
    correo //los datos se guardan en el local, ligado al correo
  }

  //Validacion de ingreso de datos, que todos los campos esten llenos
 
  const body = new FormData();
  Object.keys(datos).forEach(key => {
    if (datos[key]) body.append(key, datos[key]); //Agrega los datos en el mongo
  })

  const resultado= await fetch("http://localhost:3000/recetas/modificar", {
    method: 'PUT', 
    body
  })
  const receta= await resultado.json()
  localStorage.setItem("receta", JSON.stringify(receta)) //se envian los datos del usuario al almacenamiento local(localStorage)
  console.log(receta)

}