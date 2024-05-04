const EmployeeModel = require("../app/models/employee_model");
const employee = new EmployeeModel();
const test = async () => {
    const result = await employee.updateEmployee({
        id: 200201,
        id_number: 1404100105020001,
        name: "muhammad dhimas arista",
        title: "s.kom",
        bornplace: "bengkalis",
        birthdate: "2002-04-30T17:00:00.000Z",
        address: "jl. kenangan no. 02",
        photo: "photo_muhammad dhimas arista_1714650456192.jpg",
        id_card: "idcard_muhammad dhimas arista_1714650471655.jpg",
        position_id: 1,
        department_id: 200,
    });
    console.log(result);
}
test();