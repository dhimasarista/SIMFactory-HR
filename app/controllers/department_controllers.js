// Modules
const UserModel = require("../models/user_model");

const users = new UserModel();
module.exports = {
    render: (req, res) => {
        const user = users.GetUserByID(2004);
        const username = user["username"]
        const path = req.path;
        return res.render("departments_page", {
            username: username,
            path: path,
        })
    },
}