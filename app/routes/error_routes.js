class ErrorRoutes{
    constructor(app){
        this.app = app;
        this.main();
    }

    main(){
        this.app.get("/error", (req, res) => {
            const username = "ibmeong";
            const path = req.path;
            return res.render("error_page", {
                username: username,
                path: path,
            });
        });
        this.app.get("/500", (req, res) => {
            return res.redirect("/error?code=500&title=Internal+Server+Error&message=We+will+fix+it+as+soon+as+possible...");
        })
        this.app.get("/404", (req, res) => {
            return res.redirect("/error?code=404&title=Page+Not+Found&message=It+looks+like+you+found+a+glitch+in+the+matrix...");
        })
    }
}

module.exports = ErrorRoutes;