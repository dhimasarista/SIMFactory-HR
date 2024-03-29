"use strict";
// Impor Modul
require('dotenv').config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require('compression');
const EmployeeRoute = require("./app/routes/employee_routes");
const ErrorRoutes = require("./app/routes/error_routes");
const DepartmentRoutes = require("./app/routes/department_routes");
const UserManagementRoutes = require("./app/routes/user_management_routes");
const logger = require('./app/logging/winston');

const app = express(); // Init aplikasi
const port = process.env.APP_PORT || 3000; // Init port
const server = http.createServer(app); // Init server

// Middlewares & Routes
app.use(expressLayouts); // Layouting menggunakan EJS 
app.use(compression()); // Kompresi HTTP Resources yang dikirimkan ke klien
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});
app.set("layout", path.join(__dirname, "views/layouts/main")); // Mengatur file utama layouting
app.set("view engine", "ejs"); // Mengatur View Engine ke EJS
app.set("views", path.join(__dirname, "views")); // Mengatur path ke folder views
app.use(express.static(path.join(__dirname, "wwwroot"))); // Mengatur akses layanan file static dari folder wwwroot
app.use(express.urlencoded({extended: false})); 
app.use(express.json()); // Parsing permintaan JSON
app.use(cookieParser()); // Menggunakan cookie-parser
// Middleware logging
// Routes
new EmployeeRoute(app);     
new ErrorRoutes(app);
new DepartmentRoutes(app);
new UserManagementRoutes(app);
// Middleware untuk menangani routing yang tidak ada
app.use((req, res) => {
    return res.status(404).redirect("/404");
});

// Menjalankan aplikasi
server.listen(port, () => {
    console.clear();
    console.log(` Server running on [http://${process.env.APP_URL}:${port}]`);
});