const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const jwt = require("jsonwebtoken");
const db = require('../db');

router.get('/fetch', (req, res) => {       
    const { token, name } = req.body;

    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, profile) => {
        if (err) { 
            throw err;
        }
        if (profile[0]) {
            db.all('SELECT * FROM SERVICES_TABLE WHERE userID = ? and name = ?', [profile[0].userID, name], (err, data) => {
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

router.get('/fetchAll', (req, res) => {       
    const { token } = req.query;

    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, profile) => {
        if (err) { 
            throw err;
        }
        if (profile[0]) {
            db.all('SELECT * FROM SERVICES_TABLE WHERE userID = ?', [profile[0].userID], (err, data) => {
                if (err) { 
                    throw err;
                }
                if (data[0]) {
                    res.status(202).send(data); 
                } else {
                    res.status(404).send({message: 'Services not found'});
                }
            });
        } else {
            res.status(403).send({ message: 'Token is not valid'});
        }
    });
});

router.post('/new', (req, res) => {
    const serviceID =  randomBytes(4).toString('hex');
    const {token, name, position}= req.body;
    const sql = "INSERT INTO SERVICES_TABLE(userID, name, position, widgetsIDs, serviceID) VALUES(?, ?, ?, ?, ?)";

    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, data) => {
        if (err) { 
            throw err;
        }
        if (data[0]) {
            db.run(sql, [data[0].userID, name, position, [], serviceID], (err) => {
                if (err) { 
                    throw err; 
                }
            });
            res.status(201).send({message: 'Service added successfully'});
        } else {
            res.status(403).send({ message: 'Token is not valid'});
        }
    });
});

module.exports = router;
