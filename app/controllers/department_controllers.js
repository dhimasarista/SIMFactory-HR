// Modules
const UserModel = require("../models/user_model");
const DepartmentModel = require("../models/department_model");
const PositionModel = require("../models/position_model");
const DepartmentPositionModel = require("../models/department_position_model");

const user = new UserModel();
const department = new DepartmentModel();
const position = new PositionModel();
const departmentPosition = new DepartmentPositionModel();
module.exports = {
    renderDepartment: async (req, res) => {
        const users = user.GetUserByID(2004);
        const username = users["username"];
        const path = req.path;

        const findAllDepartment = await departmentPosition.findAll();
        const findAllPosition = await position.findAll();
        return res.render("departments_page", {
            username: username,
            path: path,
            departments: findAllDepartment,
            positions: findAllPosition,
        })
    },
    newDepartment: async (req, res) => {
        const { id, name, positions } = req.body;
        try {
            const isExist = await department.findByID(id);
            if (isExist.length !== 0) {
                return res.json({
                    status: 500,
                    message: "Department code is exist!",
                })
            }
            await department.insert(id, name);
            await departmentPosition.insert(id, positions);
            return res.json({
                status: 200,
                message: "Department added!"
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: error,
            });
        }
    },
    findDepartmentByID: async (req, res) => {
        const id = req.param("id");
        const idToNumber = parseInt(id);
        try {
            const results = await departmentPosition.findByID(idToNumber);
            return res.json({
                status: 200,
                results: results
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: error,
            });
        }
    },
    updateDepartment: async(req, res) => {
        const id = req.param("id");
        const {name} = req.body;

        try {
            await department.update(id, name);
            return res.json({
                status: 200,
                message: "Department updated!"
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: error,
            });
        }
    },
    deleteDepartment: async(req, res)=>{
        const id = req.param("id");
        try {
            await department.softDelete(id);
            return res.json({
                status: 200,
                message: "Department deleted!"
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: error,
            });
        }
    }
}