const { render } = require("../controllers/department_controllers");
class DepartmentRoutes{
    constructor(app){
        this.app = app;
        this.main();
    }

    main(){
        this.app.get("/departments", render);
    }
}

module.exports = DepartmentRoutes;