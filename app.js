"use strict";
// Impor Modul
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const http = require("http");
const path = require("path");
const SetupRoutes = require("./app/routes/routes");

const app = express(); // Init aplikasi
const port = 3000; // Init port
const server = http.createServer(app); // Init server

// Middlewares & Routes
app.use(expressLayouts); // Layouting menggunakan EJS 
app.set("layout", path.join(__dirname, "views/layouts/main")); // Mengatur file utama layouting
app.set("view engine", "ejs"); // Mengatur View Engine ke EJS
app.set("views", path.join(__dirname, "views")); // Mengatur path ke folder views
app.use(express.static(path.join(__dirname, "wwwroot"))); // Mengatur akses layanan file static dari folder wwwroot
app.use(express.json()); // Parsing permintaan JSON
SetupRoutes(app); // Mengatur semua route yang bisa diakses
app.use((req, res) => {
    // Middleware untuk menangani routing yang tidak ada
    return res.status(404).redirect("/404");
})

// Menjalankan aplikasi
server.listen(port, () => {
    console.clear();
    console.log(`Server running on http://localhost:${port}`);
});