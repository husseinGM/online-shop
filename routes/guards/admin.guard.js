exports.adminGuard = (req, res, next) => {
    if(req.session.isAdmin) next()
    else res.redirect('/not-admin')
}