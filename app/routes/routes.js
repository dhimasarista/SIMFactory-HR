const DepartmentRoutes = require("./department_routes");
const EmployeeRoute = require("./employee_routes");
const ErrorRoutes = require("./error_routes");

// Setup Routes
function SetupRoutes(app) {
    new EmployeeRoute(app);     
    new ErrorRoutes(app);
    new DepartmentRoutes(app);
}

module.exports = SetupRoutes;