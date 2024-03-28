const { render } = require("../controllers/department_controllers");
const { findAll, insert } = require("../controllers/position_controllers");
class DepartmentRoutes{
    constructor(app){
        this.app = app;
        this.department();
        this.position();
    }

    department(){
        this.app.get("/departments", render);
    }

    position(){
        this.app.get("/positions", findAll);
        this.app.post("/position/new", insert);
    }
}

module.exports = DepartmentRoutes;