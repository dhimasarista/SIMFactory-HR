const knex = require("../config/knex");
const { errorLogging } = require("../logging/console");
class DepartmentModel{
    constructor(){}
    async findByID(id){
      try {
        const departments = await knex.select("*").from("departments").where("id", parseInt(id)).andWhere("deleted_at", null);
        return departments;
      } catch (error) {
        errorLogging(error);
      }
    }

    async findAll(){
        try {
            const departments = await knex.select("*").from("departments").andWhere("deleted_at", null);
            return departments;
        } catch (error) {
          errorLogging(error);
        }
    }

    // async findDepartmentWithPosition() {
    //     try {
    //       const rows = await knex.select('*').from('departments_positions').andWhere("deleted_at", null);
    //       // Melakukan sesuatu dengan data yang diperoleh
    //       return rows; // Mengembalikan hasil query untuk digunakan di luar fungsi
    //     } catch (err) {
    //       // Menangani kesalahan jika terjadi
    //       errorLogging(err);
    //       throw err; // Melempar kesalahan untuk ditangani di luar fungsi
    //     }
    // }

    async insert(id, name){
      const newData = {
        id: parseInt(id),
        name: name,
        created_at: new Date(),
        updated_at: new Date(),
      }
      try {
        const result = await knex("departments").insert(newData);
        return result;
      } catch (error) {
        errorLogging(error);
      }
    }

    async update(id, name){
      const data = {
        name: name,
        created_at: new Date(),
        updated_at: new Date(),
      }
      try {
        const result = await knex("departments").update(data).where("id", parseInt(id));
        return result;
      } catch (error) {
        errorLogging(error);
      }
    }

    async softDelete(id){
      try {
        const result = await knex("departments").update("deleted_at", new Date()).where("id", parseInt(id));
      } catch (error) {
        errorLogging(error);
      }
    }
}

module.exports = DepartmentModel;