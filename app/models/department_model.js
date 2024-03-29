const knex = require("../config/knex");
const { errorLogging } = require("../logging/console");
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

    async findDepartmentWithPosition() {
        try {
          const rows = await knex.select('*').from('departments_positions');
          // Melakukan sesuatu dengan data yang diperoleh
          return rows; // Mengembalikan hasil query untuk digunakan di luar fungsi
        } catch (err) {
          // Menangani kesalahan jika terjadi
          errorLogging(err);
          throw err; // Melempar kesalahan untuk ditangani di luar fungsi
        }
    }

    async insert(name){
      const newData = {
        name: name,
        created_at: new Date(),
        updated_at: new Date(),
      }
      try {
        const result = await knex("departments").insert(newData);
        return result;
      } catch (error) {
        errorLogging(error);
        throw error;
      }
    }
}

module.exports = DepartmentModel;