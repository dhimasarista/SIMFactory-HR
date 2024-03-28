// Modules
const UserModel = require("../models/user_model");
const DepartmentModel = require("../models/department_model");
const PositionModel = require("../models/position_model");
const user = new UserModel();
const department = new DepartmentModel();
const position = new PositionModel();
module.exports = {
    render: async (req, res) => {
        const users = user.GetUserByID(2004);
        const username = users["username"];
        const path = req.path;

        const findAllDepartment = await department.findDepartmentWithPosition();
        const findAllPosition = await position.findAll();
        return res.render("departments_page", {
            username: username,
            path: path,
            departments: findAllDepartment,
            positions: findAllPosition,
        })
    },
}