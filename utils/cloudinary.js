
//import { v2 as cloudinary } from 'cloudinary'; forma que se supone que hay que usar
const cloudinary = require('cloudinary').v2


//USANDO MI CUENTA DE CLOUDINARY

cloudinary.config({ 
    cloud_name: 'dxhibktjk', 
    api_key: '319253297656712', 
    api_secret: 'wpKcjB9G3TxJlbEfFBIFxxwfbl4',
    secure: true
  });


async function uploadImage(filePath){
    return await cloudinary.v2.uploader.upload(filePath,{
    folder:'imagenesUsuario'
})
}

module.exports=uploadImage





















