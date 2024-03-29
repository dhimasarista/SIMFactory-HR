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
    },
    deleteEmployee: async (req, res) => {
        try {
            const id = req.params.id;
            const results = await employeeModel.softDelete(id);
            return res.json({
                status: 200,
                results: results,
                message: "Employee deleted"
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: error
            })            
        }
    }
}