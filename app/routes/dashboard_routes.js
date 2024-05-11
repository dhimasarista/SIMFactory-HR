const EmployeeModel = require("../models/employee_model");

const employeeModel = new EmployeeModel()
class DashboardRoutes{
    constructor(app){
        this.app = app;
        app.get("/dashboard", async (req, res) => {
            const employees = await employeeModel.findAll()
            return res.render("dashboard_page", {
                username: "ibmeong",
                path: req.path,
                employees,
            })
        })
    }
}

module.exports = DashboardRoutes;