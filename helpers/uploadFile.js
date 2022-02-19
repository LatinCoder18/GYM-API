const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFile = async (files, validExt = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const shortname = archivo.name.split('.')
        const ext = shortname[shortname.length - 1];

        //validar la extension
        const allowed = validExt;
        if (!allowed.includes(ext)) {
            return reject(`La extensión ${ext} no es permitida`);
        }
        const tempName = uuidv4() + '.' + ext;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        archivo.mv(uploadPath, function (err) {
            if (err) {
                return reject(err)
            }
            return resolve(tempName)
        });
        
    });
}
module.exports = {
    uploadFile
}