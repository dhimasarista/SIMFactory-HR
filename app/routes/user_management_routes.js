const { render } = require("../controllers/user_management_controllers");

class UserManagementRoutes{
    constructor(app){
        this.app = app;
        this.main();
    }

    main(){
        this.app.get("/user-management", render)
    }
}

module.exports = UserManagementRoutes;