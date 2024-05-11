class DashboardRoutes{
    constructor(app){
        this.app = app;
        app.get("/dasboard", (req, res) => {
            return res.send("hello, world!");
        })
    }
}

module.exports = DashboardRoutes;