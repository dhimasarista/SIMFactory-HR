const knex = require("../config/knex");
class DepartmentModel{
    constructor(){}

    async findAll(){
        try {
            const departments = await knex.select("*").from("departments");
            return departments;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DepartmentModel;