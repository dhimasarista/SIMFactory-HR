const knex = require("../config/knex");

class EmployeeModel{
    constructor(){}

    async findAll(){
        try {
            const employees = await knex.select('employees.*', 'positions.name as position_name', "departments.name as department_name")
            .from('employees')
            .leftJoin('positions', 'employees.position_id', 'positions.id')
            .leftJoin('departments', 'employees.department_id', 'departments.id');
            return employees;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeModel;