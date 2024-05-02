function withoutLayout(req, res, next) { 
    res.locals.layout = false;
    next();
 }
module.exports = withoutLayout;