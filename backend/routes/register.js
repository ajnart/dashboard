const express = require('express');
const app = express.Router();
const { randomBytes } = require('crypto');
const jwt = require("jsonwebtoken");
const db = require('../db');
const dateTime = require('../ExpirationDate');

app.use(express.json());

app.post('/register', function(req, res) {
  if (req.body) {
    const userID = randomBytes(4).toString('hex');
    const tempToken = randomBytes(4).toString('hex');
    const tempRefreshToken = randomBytes(4).toString('hex');
    const { username, email, password } = req.body;
    const sql = "INSERT INTO USERS_TABLE(userID, username, email, password, Token, Refreshtoken) VALUES(?, ?, ?, ?, ?, ?)";

    new Promise((resolve, reject) => {
      db.all('SELECT * FROM USERS_TABLE WHERE username = ?', [username], (err, data) => {
        if (err) {
          res.status(500).send({ message: "Internal Error" });
          reject(err);
          return;
        }
        if (data[0]) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }).then((result) => {
      if (result === true) {
        res.status(403).send({ message: 'User already exists' });
        return;
      } else {
        db.run(sql, [userID, username, email, password, tempToken, tempRefreshToken], function(err) {
          if (err) {
            throw err;
          } else {
            res.status(201).send({ message: 'User added successfully' });
            return;
          }
        });
      }
    })
  } else {
    res.status(403).send({ message: "Request body wasn't found" });
    return;
  }
});

app.get('/registered', function(req, res) {
  db.all('SELECT * FROM USERS_TABLE', (err, data) => {
    if (err) {
      res.status(500).send({ message: "Internal Error" });
      throw err;
    }
    console.log(data);
    res.status(200).send(data);
  })
});

app.post('/login', function(req, res) {
  const { username, password } = req.body;
    db.all('SELECT * FROM USERS_TABLE WHERE username = ? AND password = ?', [username, password], (err, data) => {
      if (!data[0]) {
        res.status(404).send({ message: "Can't find an user with these logs" });
      } else {
        const Refreshtoken = jwt.sign(
          {
            userID: data[0].userID
          },
          'secret',
          {
            expiresIn: "90d"
          }
        );
        const token = jwt.sign(
          {
            username: data[0].username
          },
          'secret',
          {
            expiresIn: "90d"
          }
        );
        db.run('UPDATE USERS_TABLE SET Token = ? WHERE userID = ?', [token, data[0].userID], (err) => {
          if (err) {
            res.status(500).send({ message: "Internal Error" });
            throw err;
          }
          db.run('UPDATE USERS_TABLE SET RefreshToken = ? WHERE userID = ?', [Refreshtoken, data[0].userID], (err) => {
            if (err) {
              res.status(500).send({ message: "Internal Error" });
              throw err;
            }
          });
        });
        res.status(202).send({ token: token, expire: dateTime, RefreshToken: Refreshtoken });
        return;
      }
    });
});

app.post('/refresh', function(req, res) {
  const { token } = req.body;

    db.all('SELECT * FROM USERS_TABLE WHERE RefreshToken = ?', [token], (err, data) => {
      if (err) {
        res.status(500).send({ message: "Internal Error" });
        throw err;
      } else {
        if (!data[0]) {
          res.status(404).send({ message: "Can't find an account with this token" });
        } else {
          const Refreshtoken = jwt.sign(
            {
              userID: data[0].userID
            },
            'secret',
            {
              expiresIn: "90d"
            }
          );
          const AUTHtoken = jwt.sign(
            {
              username: data[0].username
            },
            'secret',
            {
              expiresIn: "90d"
            }
          );
          db.run('UPDATE USERS_TABLE SET Token = ? AND RefreshToken = ? WHERE userID = ?', [AUTHtoken, Refreshtoken, data[0].userID], (err) => {
            if (err) {
              res.status(500).send({ message: "Internal Error" });
              throw err;
            }
            res.status(202).send({ token: AUTHtoken, expire: dateTime, RefreshToken: Refreshtoken });
          });
        }
      }
    })
});

module.exports = app;
