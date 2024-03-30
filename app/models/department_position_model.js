const knex = require("../config/knex");
const { errorLogging } = require("../logging/console");


module.exports = class DepartmentPositionModel{
    constructor(){}

    async findAll() {
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

    async insert(idDepartment, data){
        for (let index = 0; index < data.length; index++) {

        }
    }
}