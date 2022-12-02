
const cloudinary = require('cloudinary').v2


//CUENTA DE CLOUDINARY
cloudinary.config({
    cloud_name: 'dxhibktjk',
    api_key: '319253297656712',
    api_secret: 'wpKcjB9G3TxJlbEfFBIFxxwfbl4',
    secure: true
});

// FUNCION QUE VA CARGANDO LAS IMAGENES EN EL FOLDER: imagenesUsuarios
async function uploadImage(filePath){
  return await cloudinary.uploader.upload(filePath,{
    folder:'imagenesUsuario'
  })
}

module.exports = uploadImage
