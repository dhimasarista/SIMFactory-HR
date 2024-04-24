const knex = require("../config/knex");
const { errorLogging } = require("../logging/console");
class PositionModel{
    constructor(){}

    async findAll(){
        try {
            const position = await knex.select("*").from("positions");
            return position;
        } catch (error) {
            errorLogging(error);
        }
    }

    async insert(name){
        const newData = {
            name: name,
            created_at: new Date(),
            updated_at: new Date(),
        }

        try {
            const result = await knex("positions").insert(newData)
            return result;
        } catch (error) {
            errorLogging(error);
        }
    }
}

module.exports = PositionModel;