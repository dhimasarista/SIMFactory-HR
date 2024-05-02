const { render, deleteEmployee, selectPosition, findEmployeeByID, employeeLastID, newEmployee, updateEmployee } = require("../controllers/employee_controllers");
class EmployeeRoute{
    constructor(app){
        this.app = app;
        this.main(); // Memanggil fungsi main ketika class di init
    }

    main(){
        this.app.get("/employees", render);
        this.app.delete("/employee/:id", deleteEmployee);
        this.app.get("/employee/positions/department/:id", selectPosition);
        this.app.get("/employee/:id", findEmployeeByID);
        this.app.get("/employee/id/last", employeeLastID);
        this.app.post("/employee/id/new", newEmployee);
        this.app.put("/employee/id/update", updateEmployee);
    }
}

module.exports = EmployeeRoute;