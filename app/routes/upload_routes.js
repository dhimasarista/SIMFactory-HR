const {upload, deleteImage} = require("../controllers/upload_controllers");
const compressAndSaveImage = require("../utilities/compress_image");
const path = require("path");
const fs = require("fs");
const idCardsDirectory = path.join(__dirname, '../', 'uploads', 'idcards');
const photosDirectory = path.join(__dirname, '../', 'uploads', 'photos'); 
class UploadRoutes{
    constructor(app){
        this.app = app;
        this.image();
    }

    image(){
        // Routing Mengupload File
        this.app.post("/upload/image", upload.single("image"), (req, res) => {
            const filename = req.body;
            try {
                // console.log(filename.filename);
                // Setelah mengupload image
                // compressAndSaveImage(` app/uploads/${filename.filename}`, `app/uploads/photos/${filename.filename}`, 50);
                return res.json({
                    status: 200,
                    message: `Image ${filename.filename} success uploaded..`
                });
            } catch (error) {
                return res.json({
                    status: 500,
                    message: `Error deleteing ${filename} from server.`
                });
            }
        });
        // Routing Menghapus File
        this.app.post("/delete/image/:filename", (req, res) => {
            const filename = req.params.filename;
            const { type_file, type_form } = req.body;
            try {
                if (type_form === "new-form") {
                    deleteImage(filename, "../uploads/");   
                } else if (type_form === "edit-form") {
                    // Memeriksa di sub direktori
                    if (type_file === "idcard") {
                        deleteImage(filename, "../uploads/idcards/");
                    } else if (type_file === "photo") {
                        deleteImage(filename, "../uploads/photos/");
                    } 
                }
                return res.json({
                    status: 200,
                    message: `Image ${filename} has been deleted from server.`,
                    body: req.body,
                });
            } catch (error) {
                return res.json({
                    status: 500,
                    message: `Error deleteing ${filename} from server.`
                });
            }
        })
    }
}

module.exports = UploadRoutes;