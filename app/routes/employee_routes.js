const EmployeeModel = require("../models/employee_model");
const UserModel = require("../models/user_model");

class EmployeeRoute{
    constructor(app){
        this.app = app;
        this.main(); // Memanggil fungsi main ketika class di init
    }

    main(){
        const userModel = new UserModel();
        const employeeModel = new EmployeeModel();
        this.app.get("/", (req, res) => {
            return res.redirect("/employees");
        });

        this.app.get("/employees", async (req, res) => {
            const user = userModel.GetUserByID(2004);
            const username = user.username;
            const path = req.path;

            const employees = await employeeModel.findAll();
            return res.render("employees_page", {
                username: username,
                path: path,
                employees: employees,
            });
        });
    }
}

module.exports = EmployeeRoute;