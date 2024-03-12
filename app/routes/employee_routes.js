const UserModel = require("../models/user_model");

class EmployeeRoute{
    constructor(app){
        this.app = app;
        this.main(); // Memanggil fungsi main ketika class di init
    }

    main(){
        const users = new UserModel();
        this.app.get("/", (req, res) => {
            return res.redirect("/employees");
        });

        this.app.get("/employees", (req, res) => {
            const user = users.GetUserByID(2004);
            const username = user.username;
            const path = req.path;
            return res.render("employees_page", {
                username: username,
                path: path,
            });
        });
    }
}

module.exports = EmployeeRoute;