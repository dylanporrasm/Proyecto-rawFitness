
window.onload = () => {
    const rutasProtegidas = [
        'actualizarperfil',
        'ayunos',
        'ejercicios',
        'subhome',
        'subhomeprogreso',
        'recetas',
        'logros',
        'perfil-informacion'
    ]

    const urlPathName = window.location.pathname.toLocaleLowerCase();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const esRutaProtegida = rutasProtegidas.some(ruta => urlPathName.includes(ruta));

    if(esRutaProtegida && !usuario) {
        return window.location.href = 'http://localhost:3000/html/h-iniciarSesion.html';
    }

    if (!esRutaProtegida && usuario?.nombre && usuario?.altura && usuario?.peso) {
        return window.location.href = 'http://localhost:3000/html/h-subHome.html';
    }
}
