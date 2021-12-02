const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./Dashboard.db', (err) => {
    if (err) throw err;
    console.log("Connected to mysql db!");
    db.run('CREATE TABLE IF NOT EXISTS USERS_TABLE(userID, username, email, password, Token, Refreshtoken)');
    db.run('CREATE TABLE IF NOT EXISTS SERVICES_TABLE(userID, name, position, widgetsIDs, serviceID)');
    db.run('CREATE TABLE IF NOT EXISTS WIDGET_TABLE(userID, serviceName, name, description, params, widgetID)'); 
});

module.exports = db;
