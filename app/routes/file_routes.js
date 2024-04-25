const path = require('path');

class FileRoutes{
    constructor(app){
        const idCardsDirectory = path.join(__dirname, 'app', 'uploads', 'idcards');
        const photosDirectory = path.join(__dirname, 'app', 'uploads', 'photos');
        app.get("/image/idcards/:name", (req, res) => {
            const name = req.params.name;
            const filePath = path.join(idCardsDirectory, name);

            return res.send(filePath);
        });
        app.get("/image/photo/:name", (req, res) => {
            const name = req.params.name;
            const filePath = path.join(photosDirectory, name);

            return res.send(filePath);
        });
    }
}

module.exports = FileRoutes;