const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const db = require('../db');

router.get('/fetch', (req, res) => {       
    const { token, name, serviceName } = req.body;

    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, profile) => {
        if (err) { 
            throw err;
        }
        if (profile[0]) {
            db.all('SELECT * FROM WIDGET_TABLE WHERE userID = ? and name = ? and serviceName = ?', [profile[0].userID, name, serviceName], (err, data) => {
                if (err) { 
                    throw err;
                }
                if (data[0]) {
                    res.status(202).send(data[0]); 
                } else {
                    res.status(404).send({message: 'Service not found'});
                }
            });
        } else {
            res.status(403).send({ message: 'Token is not valid'});
        }
    });
});

router.get('/fetch', (req, res) => {       
    const { token, name, serviceName } = req.body;

    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, profile) => {
        if (err) { 
            throw err;
        }
        if (profile[0]) {
            db.all('SELECT * FROM WIDGET_TABLE WHERE userID = ? and name = ? and serviceName = ?', [profile[0].userID, name, serviceName], (err, data) => {
                if (err) { 
                    throw err;
                }
                if (data[0]) {
                    res.status(202).send(data[0]); 
                } else {
                    res.status(404).send({message: 'Service not found'});
                }
            });
        } else {
            res.status(403).send({ message: 'Token is not valid'});
        }
    });
});

router.put('/edit', (req, res) => {
    const widgetID =  randomBytes(4).toString('hex');
    const {token, name, description, serviceName, params}= req.body;
    const sqlInsert = "INSERT INTO WIDGET_TABLE(userID, name, description, serviceName, params, widgetID) VALUES(?, ?, ?, ?, ?, ?)";
    const sqlUpdate = "UPDATE WIDGET_TABLE SET description = ? and serviceName = ? and params = ?  where name = ? and userID = ?";


    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, profile) => {
        if (err) { 
            throw err;
        }
        if (profile[0]) {
            db.all('SELECT * FROM WIDGET_TABLE WHERE name = ?' , [name], (err, data) => {
                console.log(data);
                if (data[0]) {
                    console.log(data[0]);
                    db.run(sqlUpdate, [description, serviceName, JSON.stringify(params), name, data[0].userID], (err) => {
                        if (err) { 
                            throw err; 
                        }
                        res.status(201).send({message: 'Widget edited successfully'});
                    });
                } else {
                    db.run(sqlInsert, [profile[0].userID, name, description, serviceName, JSON.stringify(params), widgetID], (err) => {
                        if (err) { 
                            throw err; 
                        }
                        res.status(201).send({message: 'Widget set successfully'});
                    });
                }
            });
        } else {
            res.status(403).send({ message: 'Token is not valid'});
        }
    });
});

module.exports = router;
