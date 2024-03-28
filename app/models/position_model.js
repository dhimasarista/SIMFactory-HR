const knex = require("../config/knex");
class PositionModel{
    constructor(){}

    async findAll(){
        try {
            const position = await knex.select("*").from("positions");
            return position;
        } catch (error) {
            throw error;
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
            throw error;
        }
    }
}

module.exports = PositionModel;