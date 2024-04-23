const {upload, deleteImage} = require("../controllers/upload_controllers");

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
                res.status(200).send(`Image success uploaded.`);
            } catch (error) {
                return res.status(500).send(error);
            }
        });
        // Routing Menghapus File
        this.app.get("/delete/image/:filename", (req, res) => {
            const filename = req.params.filename;
            try {
                deleteImage(filename);
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