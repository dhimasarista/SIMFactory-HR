const UserModel = require("../models/user_model");
const EmployeeModel = require("../models/employee_model");
const userModel = new UserModel();
const employeeModel = new EmployeeModel();
module.exports = {
    render: async (req, res) => {
        const user = userModel.GetUserByID(2004);
        const username = user.username;
        const path = req.path;

        const employees = await employeeModel.findAll();
        return res.render("employees_page", {
            username: username,
            path: path,
            employees: employees,
        });
    }
}