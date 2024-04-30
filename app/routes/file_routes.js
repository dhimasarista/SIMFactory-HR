const path = require('path');
const imageToBlob = require('../utilities/image_blob');

const idCardsDirectory = path.join(__dirname, '../', 'uploads', 'idcards');
const photosDirectory = path.join(__dirname, '../', 'uploads', 'photos');  
class FileRoutes{
    constructor(app){
        app.post("/image/idcard/:name", (req, res) => {
            try {
                const name = req.params.name;
                const {imageBlob, imageType} = imageToBlob(name, idCardsDirectory);
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
                return res.status(200).send(imageBlob);
            } catch (error) {
                return res.status(500).send(error);
            }
        });
        app.post("/image/photo/:name", (req, res) => {
            try {
                const name = req.params.name;
                const {imageBlob, imageType} = imageToBlob(name, photosDirectory);
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
                return res.status(200).send(imageBlob);
            } catch (error) {
                return res.status(500).send(error);
            }
        });
    }
}

module.exports = FileRoutes;