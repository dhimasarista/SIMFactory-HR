"use strict";
// Impor Modul
require('dotenv').config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require('compression');
const cors = require("cors");
const EmployeeRoute = require("./app/routes/employee_routes");
const ErrorRoutes = require("./app/routes/error_routes");
const DepartmentRoutes = require("./app/routes/department_routes");
const UserManagementRoutes = require("./app/routes/user_management_routes");
const logger = require('./app/logging/winston');
const { successLogging } = require('./app/logging/console');
const metrics = require('./app/utilities/metrics');
const UploadRoutes = require('./app/routes/upload_routes');
const FileRoutes = require('./app/routes/file_routes');
const AuthRoutes = require('./app/routes/auth_routes');

const app = express(); // Init aplikasi
const port = process.env.APP_PORT || 3000; // Init port
const server = http.createServer(app); // Init server
console.clear();
// Middlewares & Routes
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});
app.use(compression()); // Kompresi HTTP Resources yang dikirimkan ke klien
app.set("layout", path.join(__dirname, "views/layouts/main")); // Mengatur file utama layouting
app.set("view engine", "ejs"); // Mengatur View Engine ke EJS
app.set("views", path.join(__dirname, "views")); // Mengatur path ke folder views
app.use(express.static(path.join(__dirname, "wwwroot"))); // Mengatur akses layanan file static dari folder wwwroot
app.use(express.urlencoded({extended: false})); 
app.use(express.json()); // Parsing permintaan JSON
app.use(bodyParser.json());
app.use(cookieParser()); // Menggunakan cookie-parser
app.use(cors());  // Add cors middleware

// Routes without auth
app.get("/", (req, res) => {
    return res.redirect("/login");
});
new AuthRoutes(app);
// Routes with auth, layouting
app.use(expressLayouts); // Layouting menggunakan EJS 
new EmployeeRoute(app);     
new ErrorRoutes(app);
new DepartmentRoutes(app);
new UserManagementRoutes(app);
new UploadRoutes(app);
new FileRoutes(app);
app.get("/metrics", (req, res) => {
    try {
        const data = metrics();
        res.json({
            status: 200,
            metrics: data
        });
    } catch (error) {
        res.json({
            status: 500,
            message: error,
        })
    }
});
// Middleware untuk menangani routing yang tidak ada
app.use((req, res) => {
    return res.status(404).redirect("/404");
});

// Menjalankan aplikasi
server.listen(port, () => {
    const message = `Server ${process.env.APP_NAME} running on http://${process.env.APP_URL}:${port}`;
    successLogging(message);
});