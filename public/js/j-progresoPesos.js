import { formatDate } from "./utilidades.js";

//GRAFICA DE PESOS
document.querySelector(".agregar-peso").addEventListener("click",agregarParametro);
document.querySelector(".mostrar-resultados").addEventListener("click", async () => {
  await modificarProgreso();
  const usuario = obtenerUsuarioDelLocalStorage();
  agregarParametro();
  mostrarResultados(usuario.progresos);
});

function obtenerUsuarioDelLocalStorage(){
  const usuario=JSON.parse(localStorage.getItem("usuario"))
  return usuario;
}

async function obtenerUsuario(){
  const usuarioActual = obtenerUsuarioDelLocalStorage();
  const resultado = await fetch(`http://localhost:3000/usuarios/buscar-por/${usuarioActual.correo}`);
  const usuario = await resultado.json();
  return usuario;
}

async function modificarProgreso(){
  const usuarioActual = obtenerUsuarioDelLocalStorage();
  const progresosActuales = usuarioActual.progresos;
  const fechasNuevas = document.querySelectorAll('#fecha-nueva');
  const pesosNuevos = document.querySelectorAll('#peso-nuevo');
  if (fechasNuevas?.length && pesosNuevos?.length) {
    const nuevosProgresos = []
    fechasNuevas.forEach((fechaInput, indice) => {
      const inputPeso = pesosNuevos[indice]
      const nuevoProgreso = {
        fecha: fechaInput?.value,
        peso: parseFloat(inputPeso?.value)
      }
      nuevoProgreso.fecha && nuevoProgreso.peso && nuevosProgresos.push(nuevoProgreso)
    })

    if (nuevosProgresos?.length) {
      const resultado = await fetch("http://localhost:3000/usuarios/modificar", {
        method: 'PUT',
        body: JSON.stringify({
          ...usuarioActual,
          progresos: [...progresosActuales, ...nuevosProgresos],
          peso:nuevosProgresos[nuevosProgresos.length-1].peso
        }),
        headers: {'Content-Type': 'application/json'}
      });
      const usuario = await resultado.json();
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }
  }
}

//genera los datos ya existentes del usuario
function generarParametros(progresos){
  const contenedor = document.querySelector(".contenedor");

  if (progresos?.length) {
    progresos.forEach(({ peso, fecha }) => {
      const nuevoHTML = `<div><input type="date" class="fecha" placeholder="Ingrese una fecha" value="${formatDate(fecha)}"><input type="number" class="peso" placeholder="Peso/Kg" value="${peso}"></div>`;
      contenedor.insertAdjacentHTML('beforeend', nuevoHTML);
    })
    agregarParametro();
  } else {
    for (let i = 0; i < 2; i++) {
      agregarParametro();
    }
  }
}

function agregarParametro(){
    let contenedor = document.querySelector(".contenedor");
    let nuevoHTML = '<div><input id="fecha-nueva" type="date" class="fecha" placeholder="Ingrese una fecha"><input id="peso-nuevo" type="number" class="peso" placeholder="Peso/Kg"></div>';
    contenedor.insertAdjacentHTML('beforeend', nuevoHTML);
}

function mostrarResultados(progresos) {
    const pesos = progresos.map(({ peso }) => peso);
    const fechas = progresos.map(({ fecha }) => formatDate(fecha));
    var data = [{
      x: fechas,
      y: pesos,
      backgroundColor:"black",
      borderColor:"black",
      type: "linear"
    }];

    Plotly.newPlot("grafico",data);


}


//GRAFICA DE METAS

let grafica=document.getElementById("grafica-metas").getContext("2d");

var chart = new Chart(grafica,{
  type:"bar",
  data:{
    labels:["meta-1","meta-2","meta-3"],
    datasets:[
      {
        label:"grafica de metas",
        backgroundColor:"#09CaDE",
        borderColor:"yellow",
        data:[90,82,78,100]

      }
    ]

  }
})


//Cargar datos apenas carga la pagina
const cargarDatos = async () => {
  const usuario = await obtenerUsuario();
  generarParametros(usuario.progresos);
  mostrarResultados(usuario.progresos);
};

cargarDatos();
