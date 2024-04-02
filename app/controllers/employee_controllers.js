const UserModel = require("../models/user_model");
const EmployeeModel = require("../models/employee_model");
const DepartmentModel = require("../models/department_model");
const userModel = new UserModel();
const employeeModel = new EmployeeModel();
const departmentModel = new DepartmentModel();
module.exports = {
    render: async (req, res) => {
        const user = userModel.GetUserByID(2004);
        const username = user.username;
        const path = req.path;

        const employees = await employeeModel.findAll();
        const departments = await departmentModel.findAll();
        return res.render("employees_page", {
            username: username,
            path: path,
            employees: employees,
            departments: departments
        });
    },
    deleteEmployee: async (req, res) => {
        try {
            const id = req.params.id;
            await employeeModel.softDelete(id);
            return res.json({
                status: 200,
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