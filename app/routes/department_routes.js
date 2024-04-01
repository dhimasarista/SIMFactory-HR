const { renderDepartment, newDepartment, findDepartmentByID, updateDepartment } = require("../controllers/department_controllers");
const { findAllPositions, newPosition} = require("../controllers/position_controllers");
const DepartmentModel = require("../models/department_model");
class DepartmentRoutes{
    constructor(app){
        this.app = app;
        this.department();
        this.position();
    }

    department(){
        this.app.get("/departments", renderDepartment);
        this.app.post("/department/new", newDepartment);
        this.app.get("/department/:id", findDepartmentByID);
        this.app.put("/department/:id", updateDepartment);
    }

    position(){
        this.app.get("/positions", findAllPositions);
        this.app.post("/position/new", newPosition);
    }
}

module.exports = DepartmentRoutes;