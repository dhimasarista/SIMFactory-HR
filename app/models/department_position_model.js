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
            'positions.id as position_id',
            'positions.name as positions_name',
            knex.raw('GROUP_CONCAT(positions.id) as position_ids')
          )
          .leftJoin('departments', 'departments_positions.department_id', 'departments.id')
          .leftJoin('positions', 'departments_positions.position_id', 'positions.id')
          .groupBy('departments.id', 'departments.name')
          .where("departments.id", id);
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
            'positions.id as position_id',
            'positions.name as positions_name',
            knex.raw('GROUP_CONCAT(positions.id) as position_ids')
          )
          .leftJoin('departments', 'departments_positions.department_id', 'departments.id')
          .leftJoin('positions', 'departments_positions.position_id', 'positions.id')
          .groupBy('departments.id', 'departments.name');
    
        return rows;
      } catch (err) {
        errorLogging(err);
        throw err;
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