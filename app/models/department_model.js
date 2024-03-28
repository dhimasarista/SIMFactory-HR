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

    async findDepartmentWithPosition() {
        try {
          const rows = await knex.select('*').from('departments_positions');
          // Melakukan sesuatu dengan data yang diperoleh
          console.log(rows);
          return rows; // Mengembalikan hasil query untuk digunakan di luar fungsi
        } catch (err) {
          // Menangani kesalahan jika terjadi
          console.error(err);
          throw err; // Melempar kesalahan untuk ditangani di luar fungsi
        } finally {
          // Menutup koneksi ke database
          knex.destroy();
        }
      }
}

module.exports = DepartmentModel;