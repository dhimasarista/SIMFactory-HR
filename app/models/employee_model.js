const knex = require("../config/knex");
const { errorLogging } = require("../logging/console");
const formatDate = require("../utilities/formatting_date");

class EmployeeModel{
    constructor(){}

    async findByID(id){
        try {
            const employee = await knex("employees").where("id", id).andWhere("deleted_at",null);
            return employee;
        } catch (error) {
            errorLogging(error);
        }
    }

    async newEmployee(data){
        try {
            const newEmployee = {
                id: data.employeeId,
                id_number: data.idNumber,
                name: data.name,
                title: data.title,
                bornplace: data.bornplace,
                birthdate: data.birthdate, // "mm-dd-yyyy"
                address: data.address,
                photo: data.photo,
                id_card: data.idCard,
                position_id: data.positionId,
                department_id: data.departmentId,
            }
            const results = await knex("employees").insert(newEmployee);
            return results;
        } catch (error) {
            errorLogging(error);
        }
    }
    async updateEmployee(data){
        try {
            const employee = {
                id_number: data.idNumber,
                name: data.name,
                title: data.title,
                bornplace: data.bornplace,
                birthdate: data.birthdate, // "mm-dd-yyyy"
                address: data.address,
                photo: data.photo,
                id_card: data.idCard,
                position_id: data.positionId,
                department_id: data.departmentId,
            }
            const results = await knex("employees").update(employee).where("id", data.employeeId);
            return results;
        } catch (error) {
            errorLogging(error);
        }
    }

    async findAll(){
        try {
            const employees = await knex.select('employees.*', 'positions.name as position_name', "departments.name as department_name")
            .from('employees').where("employees.deleted_at", null)
            .leftJoin('positions', 'employees.position_id', 'positions.id')
            .leftJoin('departments', 'employees.department_id', 'departments.id');
            return employees;
        } catch (error) {
            errorLogging(error); 
        }
    }

    async lastID(){
        try {
            // Mengambil semua data dari tabel "employees" dan mengurutkannya berdasarkan ID secara descending
            const rows = await knex("employees").select("id").orderBy("id", "desc");
            
            // Jika ada baris data, kembalikan ID dari baris pertama
            if (rows.length > 0) {
                return rows[0].id;
            } else {
                // Jika tidak ada data, kembalikan null atau throw error sesuai kebutuhan
                return 200200;
            }
        } catch (error) {
            errorLogging(error);
        }
    }

    async hardDelete(id){
        try {
            const results = await knex("employees").where("id", id).del();
            return results;
        } catch (error) {
            errorLogging(error);
        }
    }

    async softDelete(id){
        try {
            const results = await knex("employees").where("id", id).update("deleted_at", knex.fn.now());
            return results;
        } catch (error) {
            errorLogging(error);
        }
    }
}

module.exports = EmployeeModel;