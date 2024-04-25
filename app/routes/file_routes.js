const path = require('path');
const fs = require("fs");

class FileRoutes{
    constructor(app){
        const idCardsDirectory = path.join(__dirname, '../', 'uploads', 'idcards');
        const photosDirectory = path.join(__dirname, '../', 'uploads', 'photos');
        app.get("/image/idcard/:name", (req, res) => {
            const name = req.params.name;
            console.log(name);
            const filePath = path.join(idCardsDirectory, name);

            fs.readFileSync(filePath, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                    });
                }

                res.setHeader('Content-Type', 'application/octet-stream');
                res.send(data);
            });
        });
        app.get("/image/photo/:name", (req, res) => {
            const name = req.params.name;
            const filePath = path.join(photosDirectory, name);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                    });
                }

                res.setHeader('Content-Type', 'application/octet-stream');
                res.send(data);
            });
        });
    }
}

module.exports = FileRoutes;