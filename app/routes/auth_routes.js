const { errorLogging } = require("../logging/console");
const withoutLayout = require("../utilities/without_layout");

class AuthRoutes{
    constructor(app){
        this.app = app;

        this.login();
    }

    login(){
        this.app.get("/login", withoutLayout, (req, res) => {
            try {
                return res.render("login", {
                    path: req.path,
                    username: "ibmeong",
                    errors: [{message: "Username salah!"}]
                });
            } catch (error) {
                errorLogging(error);
                return res.redirect("/500");
            }
        })
    }
}

module.exports = AuthRoutes;