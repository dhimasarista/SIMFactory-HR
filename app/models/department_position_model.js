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

    async insert(idDepartment, positions) {
      let results = '';
      for (let index = 0; index < positions.length; index++) {
        const data = {
          department_id: parseInt(idDepartment),
          position_id: parseInt(positions[index]),
          created_at: new Date(),
          updated_at: new Date(),
        };
        try {
          const result = await knex("departments_positions").insert(data);
          results += `Data-${index + 1}: ${JSON.stringify(result)}\n`;
        } catch (error) {
          errorLogging(error);
          throw error;
        }
      }
      return results;
    }
}