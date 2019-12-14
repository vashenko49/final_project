const cloudinary = require('cloudinary').v2;

exports.uploadArrayImgToCloudinary = (files, path) =>{
  return Promise.all(files.map( async element=>{
    const photo = await cloudinary.uploader.upload(element.path, {folder: path});
    return {
      url:photo.public_id,
      field:element.fieldName
  };
  }))
};

exports.removeImgFromCloudinaryUseArray = (pathArray)=>{
  return Promise.all(pathArray.map(async element=>{
    return await cloudinary.uploader.destroy(element);
  }))
};
