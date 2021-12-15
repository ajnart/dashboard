const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const db = require('../db');

router.get('/fetchAll', (req, res) => {       
    const { token, serviceName } = req.query;

    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, profile) => {
        if (err) { 
            throw err;
        }
        if (profile[0]) {
            db.all('SELECT * FROM WIDGET_TABLE WHERE userID = ? and serviceName = ?', [profile[0].userID, serviceName], (err, data) => {
                if (err) { 
                    throw err;
                }
                if (data[0]) {
                    res.status(202).send(data); 
                } else {
                    res.status(202).send({message: 'Widgets not found'});
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
    const serviceInsert = "UPDATE SERVICES_TABLE SET widgetsIDs = ? WHERE serviceID = ?";
    const serviceSelect = "SELECT * FROM SERVICES_TABLE WHERE name = ? and userID = ?";


    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, profile) => {
        if (err) { 
            throw err;
        }
        if (profile[0]) {
            db.all('SELECT * FROM WIDGET_TABLE WHERE name = ? and userID = ?' , [name, profile[0].userID], (err, data) => {
                if (err) { 
                    throw err; 
                }
                db.all(serviceSelect, [serviceName, profile[0].userID], (err, service) => {
                    if (err) { 
                        throw err; 
                    }     
                    if (data[0] && service[0]) {
                        db.run(sqlUpdate, [description, serviceName, JSON.stringify(params), name, data[0].userID], (err) => {
                            if (err) {
                                throw err; 
                            }
                            new Promise((resolve, reject) => {
                                if (service[0].widgetsName) {
                                    service[0].widgetsName[service[0].widgetsName.length] = widgetID;
                                    resolve(service[0].widgetsName);
                                } else {
                                    service[0].widgetsName = [widgetID];
                                    resolve(service[0].widgetsName);
                                }
                            }).then ((widgetsName) => {
                                db.run(serviceInsert, [JSON.stringify(widgetsName), service[0].serviceID], (err) => {
                                    if (err) { throw err; }
                                    res.status(201).send({message: 'Widget edited successfully'});
                                });
                            })
                        });
                    } else if (service[0]) {
                        db.run(sqlInsert, [profile[0].userID, name, description, serviceName, JSON.stringify(params), widgetID], (err) => {
                            if (err) { 
                                throw err; 
                            }
                            if (service[0].widgetsName) {
                                service[0].widgetsName[service[0].widgetsName.length] = widgetID;
                            } else {
                                service[0].widgetsName = [widgetID];
                            }
                            db.run(serviceInsert, [[JSON.stringify(service[0].widgetsName)], serviceName], (err) => {if (err) { throw err; }});
                            res.status(201).send({message: 'Widget set successfully'});
                        });
                    } else {
                        res.status(404).send({message: 'Service not found'});
                    }
                })
            });
        } else {
            res.status(403).send({ message: 'Token is not valid'});
        }
    });
});

router.delete('/delete', (req, res) => {
    const widgetID =  randomBytes(4).toString('hex');
    const {token, name}= req.body;
    const sqlDelete = "DELETE FROM WIDGET_TABLE WHERE userID = ? AND name = ?";

    db.all('SELECT * FROM USERS_TABLE WHERE Token = ?', token, (err, profile) => {
        if (err) { 
            throw err;
        }
        if (profile[0]) {
            db.all('SELECT * FROM WIDGET_TABLE WHERE name = ? and userID = ?' , [name, profile[0].userID], (err, data) => {
                if (err) { 
                    throw err; 
                }
                db.all(sqlDelete, [profile[0].userID, name], (err, service) => {
                    if (err) { 
                        throw err; 
                    }     
                    res.status(202).send({message: 'Widget deleted successfully'});
                })
            });
        } else {
            res.status(403).send({ message: 'Token is not valid'});
        }
    });
});

module.exports = router;
