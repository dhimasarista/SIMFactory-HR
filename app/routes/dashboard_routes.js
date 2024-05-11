class DashboardRoutes{
    constructor(app){
        this.app = app;
        app.get("/dashboard", (req, res) => {
            return res.render("dashboard_page", {
                username: "ibmeong",
                path: req.path,
            })
        })
    }
}

module.exports = DashboardRoutes;