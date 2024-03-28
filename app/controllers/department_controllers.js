// Modules
const UserModel = require("../models/user_model");
const DepartmentModel = require("../models/department_model");

const users = new UserModel();
const departments = new DepartmentModel();
module.exports = {
    render: async (req, res) => {
        const user = users.GetUserByID(2004);
        const username = user["username"];
        const path = req.path;

        const findAll = await departments.findDepartmentWithPosition();
        return res.render("departments_page", {
            username: username,
            path: path,
            departments: findAll
        })
    },
}