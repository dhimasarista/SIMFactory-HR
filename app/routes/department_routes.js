const UserModel = require("../models/user_model");

class DepartmentRoutes{
    constructor(app){
        this.app = app;
        this.main();
    }

    main(){
        const users = new UserModel();
        this.app.get("/departments", (req, res) => {
            const user = users.GetUserByID(2004);
            const username = user["username"]
            const path = req.path;
            return res.render("departments_page", {
                username: username,
                path: path,
            })
        })
    }
}

module.exports = DepartmentRoutes;