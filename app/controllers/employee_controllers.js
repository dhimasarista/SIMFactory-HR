const compressAndSaveImage = require("../utilities/compress_image");
const UserModel = require("../models/user_model");
const EmployeeModel = require("../models/employee_model");
const DepartmentModel = require("../models/department_model");
const DepartmentPositionModel = require("../models/department_position_model");
const { deleteImage } = require("./upload_controllers");
const userModel = new UserModel();
const employeeModel = new EmployeeModel();
const departmentModel = new DepartmentModel();
const departmentPositionModel = new DepartmentPositionModel();
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
    newEmployee: async (req, res) => {
        const newEmployee = req.body;
        try {
            let checkingForm = newEmployee["name"] === "" || newEmployee["id_number"] === "" || newEmployee["employee_id"] === "" || newEmployee["id_card"] === "" || newEmployee["photo"] === "" 
            if (checkingForm) {
                return res.json({
                    status: 500,
                    message: "form is empty"
                });
            }
            await compressAndSaveImage(`app/uploads/${newEmployee["id_card"]}`, `app/uploads/idcards/${newEmployee["id_card"]}`, 50);
            deleteImage(newEmployee["id_card"], "../uploads/");
            await compressAndSaveImage(`app/uploads/${newEmployee["photo"]}`, `app/uploads/photos/${newEmployee["photo"]}`, 50);
            deleteImage(newEmployee["photo"], "../uploads/");

            const resultNewEmployee = await employeeModel.newEmployee(
                {
                    employeeId: newEmployee["employee_id"], 
                    idNumber: newEmployee["id_number"], 
                    name: newEmployee["name"],
                    title: newEmployee["title"],
                    bornplace: newEmployee["bornplace"], 
                    birthdate: newEmployee["birthdate"],
                    address: newEmployee["address"], 
                    photo: newEmployee["photo"],
                    idCard: newEmployee["id_card"],
                    positionId: newEmployee["position_id"],
                    departmentId: newEmployee["department_id"],
                }
            );

            return res.json({
                status: 200,
                employee: resultNewEmployee,
                message: "New employee"
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: error
            });
        }
    },
    findEmployeeByID: async (req, res) => {
        try {
            const id = req.params.id;
            const results = await employeeModel.findByID(parseInt(id));
                return res.json({
                    status: 200,
                    message: "Employeee finded!",
                    employee: results,
                });
        } catch (error) {
            return res.json({
                status: 500,
                message: error
            });
        }
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
            });
        }
    },
    selectPosition: async (req, res) => {
        try {
            const idDepartment = req.params.id;
            const positions = await departmentPositionModel.findByID(idDepartment);
            res.json({
                status: 200,
                message: "position fetched!",
                positions: positions,
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: error
            });
        }
    },
    employeeLastID: async (req, res) => {
        try {
            const lastId = await employeeModel.lastID();
            return res.json({
                status: 200,
                last_id: lastId,
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: error
            });
        }
    }
}