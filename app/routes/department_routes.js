const { renderDepartment, newDepartment } = require("../controllers/department_controllers");
const { findAllPositions, newPosition} = require("../controllers/position_controllers");
class DepartmentRoutes{
    constructor(app){
        this.app = app;
        this.department();
        this.position();
    }

    department(){
        this.app.get("/departments", renderDepartment);
        this.app.post("/department", newDepartment);
    }

    position(){
        this.app.get("/positions", findAllPositions);
        this.app.post("/position/new", newPosition);
    }
}

module.exports = DepartmentRoutes;