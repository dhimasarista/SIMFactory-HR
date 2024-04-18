const knex = require("../config/knex");
const { errorLogging } = require("../logging/console");

class EmployeeModel{
    constructor(){}

    async findByID(id){
        try {
            const employee = await knex("employees").where("id", id).andWhere("deleted_at",null);
            return employee;
        } catch (error) {
            throw error;
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
            throw error; 
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
            throw error;
        }
    }

    async hardDelete(id){
        try {
            const results = await knex("employees").where("id", id).del();
            return results;
        } catch (error) {
            errorLogging(error);
            throw error;
        }
    }

    async softDelete(id){
        try {
            const results = await knex("employees").where("id", id).update("deleted_at", knex.fn.now());
            return results;
        } catch (error) {
            errorLogging(error);
            throw error;
        }
    }
}

module.exports = EmployeeModel;