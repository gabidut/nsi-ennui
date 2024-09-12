const Router = require('express').Router;

const router = Router();

router.post('/login', (req, res) => {
    if (!req.body.username) {
        res.json({
            success: false,
            message: 'Username required'
        })
        return;
    }
    if (req.body.username === 'admin' && !req.body.password) {
        res.json({
            success: false,
            needPassword: true,
            message: 'Password required (et oui)'
        })
        return;
    }

    if (req.body.password === 'admin' && req.body.password !== undefined) {
        if (req.body.username === 'admin' && req.body.password === 'admin') {
            console.log("admin ok");
            
            req.session.user = 'admin';
            res.json({
                success: true,
                message: 'Logged in'
            })
            return;
        } 
        
        if(req.body.password != "admin") {
            res.json({
                success: false,
                message: 'Wrong password'
            })
            return;
        }
    }

    req.session.user = req.body.username == "admin" ? "pasadmin" : req.body.username;

    res.json({
        success: true,
        message: 'Logged in'
    })
});

module.exports = router;