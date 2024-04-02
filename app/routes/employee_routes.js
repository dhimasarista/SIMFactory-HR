const { render, deleteEmployee, selectPosition } = require("../controllers/employee_controllers");
class EmployeeRoute{
    constructor(app){
        this.app = app;
        this.main(); // Memanggil fungsi main ketika class di init
    }

    main(){
      
        this.app.get("/", (req, res) => {
            return res.redirect("/employees");
        });
        this.app.get("/employees", render);
        this.app.delete("/employee/:id", deleteEmployee);
        this.app.get("/employee/positions/department/:id", selectPosition);
    }
}

module.exports = EmployeeRoute;