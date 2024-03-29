const knex = require("../config/knex");

class EmployeeModel{
    constructor(){}

    async findAll(){
        try {
            const employees = await knex.select('employees.*', 'positions.name as position_name')
            .from('employees')
            .leftJoin('positions', 'employees.position_id', 'positions.id');
            return employees;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeModel;