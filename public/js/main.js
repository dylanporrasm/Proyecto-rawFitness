

/*window.onload = () => {
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
    const existeUsuario = !!JSON.parse(localStorage.getItem("usuario"));
    const esRutaProtegida = rutasProtegidas.some(ruta => urlPathName.includes(ruta))
    
   if(esRutaProtegida && !existeUsuario ) {
        return window.location.href = 'http://localhost:5000/html/h-iniciarSesion.html';
    }
    if (!esRutaProtegida && existeUsuario) {
        return window.location.href = 'http://localhost:5000/html/h-subHome.html';
    }
}*/
