const cloudinary = require('cloudinary').v2;

exports.uploadArrayImgToCloudinary = (files, path) =>{
  return Promise.all(files.map( async element=>{
    const photo = await cloudinary.uploader.upload(element.path, {folder: path});
    return photo.public_id;
  }))
};
