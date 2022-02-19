const path = require('path');
const fs = require('fs');
const { response } = require('express');
const  Client  = require('../models/client');
const  User  = require('../models/user');
const { uploadFile } = require('../helpers/uploadFile');


const uploadFiles = async (req, res = response) => {
    try {
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = await uploadFile(req.files, undefined, 'imgs');
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const updateProfilePic = async (req, res = response) => {

    const { id, colection } = req.params;

    let modelo;

    switch (colection) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'clients':
            modelo = await Client.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un cliente con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    // Limpiar imágenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', colection, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }


    const name = await uploadFile(req.files, undefined, colection);
    modelo.img = name;
    await modelo.save();
    res.json(modelo);

}

const showImage = async (req, res = response) => {
    const { id, colection } = req.params;

    let modelo;

    switch (colection) {
        case 'users':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'clients':
            modelo = await Client.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


   
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', colection, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }
    res.json({ msg: 'missing place holder' });
}


module.exports = {
    updateProfilePic,
    uploadFiles,
    showImage
}