const {upload, deleteImage} = require("../controllers/upload_controllers");
const compressAndSaveImage = require("../utilities/compress_image");

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
                // compressAndSaveImage(`app/uploads/${filename.filename}`, `app/uploads/photos/${filename.filename}`, 10);
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
        this.app.get("/delete/image/:filename", (req, res) => {
            const filename = req.params.filename;
            try {
                deleteImage(filename, "../uploads/");
                return res.json({
                    status: 200,
                    message: `Image ${filename} has been deleted from server.`
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