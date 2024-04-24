const knex = require("../config/knex");
const { errorLogging } = require("../logging/console");


module.exports = class DepartmentPositionModel{
    constructor(){}

    async findByID(id){
      try {
        const rows = await knex('departments_positions')
        .select(
          'departments.id as department_id',
          'departments.name as department_name', 
          knex.raw('GROUP_CONCAT(positions.id) as position_ids'),
          knex.raw('GROUP_CONCAT(positions.name) as positions_names')
        )
        .leftJoin('departments', 'departments_positions.department_id', 'departments.id')
        .leftJoin('positions', 'departments_positions.position_id', 'positions.id')
        .groupBy('departments.id', 'departments.name')
        .where("departments.id", id)
        .andWhere("departments.deleted_at", null);
        // Memisahkan string menjadi array
        rows.forEach(row => {
          row.positions_names = row.positions_names.split(',');
          row.position_ids = row.position_ids.split(',');
        });
        // mengambil total employee berdasarkan id tertentu
        const countEmployeeByDepartment = await knex("employees").count("id as total_employees").where("department_id", id).andWhere("deleted_at", null);
        const totalEmployees = countEmployeeByDepartment[0].total_employees;
        // Tambahkan total_employees ke dalam setiap objek dalam array rows
        rows.forEach(row => {
          row.total_employees = totalEmployees;
        });
        return rows;
      } catch (err) {
          errorLogging(err);
        throw err;
      }
    }

    async findAll() {
      try {
        const rows = await knex('departments_positions')
          .select(
            'departments.id as department_id',
            'departments.name as department_name', 
            knex.raw('GROUP_CONCAT(positions.id) as position_ids'),
            knex.raw('GROUP_CONCAT(positions.name) as positions_names')
          )
          .leftJoin('departments', 'departments_positions.department_id', 'departments.id')
          .leftJoin('positions', 'departments_positions.position_id', 'positions.id')
          .groupBy('departments.id', 'departments.name')
          .where("departments.deleted_at", null);
        
        // Memisahkan string menjadi array
        rows.forEach(row => {
          row.positions_names = row.positions_names.split(',');
          row.position_ids = row.position_ids.split(',');
        });
    
        return rows;
      } catch (err) {
        errorLogging(err);
      }
    }
     

    async insert(departmentID, positions) {
      let results = '';
      for (let index = 0; index < positions.length; index++) {
        const data = {
          department_id: parseInt(departmentID),
          position_id: parseInt(positions[index]),
          created_at: new Date(),
          updated_at: new Date(),
        };
        try {
          const result = await knex("departments_positions").insert(data);
          results += `Data-${index + 1}: ${JSON.stringify(result)}\n`;
        } catch (error) {
          errorLogging(error);
        }
      }
      return results;
    }

    async update(positions, departmentID){
      try {
        await knex("departments_positions").where("department_id", departmentID).del();
        const result = await this.insert(departmentID, positions);
        return result;
      } catch (error) {
      }
    }

    async softDelete(departmentID){
      try {
        await knex("department_positions").where("deparment_id", departmentID).update("deleted_at", knex.fn.now());
      } catch (error) {
      }
    }
}