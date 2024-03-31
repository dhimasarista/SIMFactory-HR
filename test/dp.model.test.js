const { expect } = require('chai');
const DepartmentPositionModel = require("../app/models/department_position_model");
const departmentPosition = new DepartmentPositionModel();

describe('Find All', () => { 
    it('should return departments with positions', async () => { 
        const result = await departmentPosition.findAll();
        console.log(result);
     })
})