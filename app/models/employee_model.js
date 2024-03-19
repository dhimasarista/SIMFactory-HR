const knex = require("../config/knex");

class EmployeeModel{
    constructor(){}

    async findAll(){
        try {
            const employees = await knex.select("*").from("employees");
            return employees;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeModel;