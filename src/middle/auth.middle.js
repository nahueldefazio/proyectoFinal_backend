const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.touch()
        next();
    } else {
        return res.status(401).send('Not Authorized');
    }
}

export default auth;