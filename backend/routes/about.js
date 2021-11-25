const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/about.json', (req, res) => {       
    const { token } = req.body;

    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, profile) => {
        if (err) { 
            throw err;
        }
        if (profile[0]) {
            db.all('SELECT * FROM SERVICES_TABLE WHERE userID = ?', [profile[0].userID], (err, services) => {
                if (err) { 
                    throw err;
                }
                db.all('SELECT * FROM WIDGET_TABLE WHERE userID = ?', [profile[0].userID], (err, widgets) => {
                    if (err) { 
                        throw err;
                    }
                    res.status(202).send({time: Date.now(), services: services, widgets: widgets}); 
                });
            });
        } else {
            res.status(403).send({ message: 'Token is not valid'});
        }
    });
});

module.exports = router;