// Auth module
// ===========================================

module.exports = {
    protection: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "Vous n'avez pas les autoristations nécessaires pour acceder à cette resource");
        res.redirect("/users/login");
    }
}
