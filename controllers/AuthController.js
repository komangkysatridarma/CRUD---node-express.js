const dbConfig = require('../config/database')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const pool = mysql.createPool(dbConfig)
const {
    responseAuthSuccess,
    responseFailValidate
} = require('../traits/ApiResponse')

pool.on('error', (err) => {
    console.error(err)
})

//rahasia banget nich, jangan sampe ada yang tw
const accessTokenSecret = '2023-WikramA-exp'

const register = (req,res) => {
    const data = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    if(data.email == null || data.username == null || data.password == null){
        responseFailValidate(res, 'Email/password/username wajib diisi')
    }else{
        const query = 'INSERT INTO users SET ?'

        const query2 = `SELECT * FROM users WHERE email='${data.email}' OR username='${data.username}'`

        pool.getConnection(async (err, connection) => {
            if(err) throw err
           var checkUnique = new Promise((resolve) => {
            connection.query(query2, (err, results) => {
                if(err) throw err
    
                if(results.length > 0){
                    res.status(403).json({
                        message: 'Email/username sudah digunakan'
                    })
                }else{
                    resolve()
                }
            })
           })
        
           await checkUnique.then(() => {
            connection.query(query, [data], (err, results) => {
                if(err) throw err

                if(results.affectedRows >= 1){
                    const token = jwt.sign({
                        email: data.email,
                        username: data.username
                    }, accessTokenSecret)

                    responseAuthSuccess(res, token, 'Register successfully', {
                        email: data.email,
                        username: data.username
                    })
                }else{
                    res.status(500).json({
                        message: 'Failed creating user'
                    })
                }
            })
           })
        pool.getConnection((err, connection) => {
            if(err) throw err

            connection.release()
        })
    })
    }
}

const login = (req, res) => {
    if(req.body.email == null || req.body.password == null) {
        responseFailValidate(res, 'Email/password wajib diisi');
    }

    const {email, password} = req.body;

    const query = `SELECT * FROM users WHERE email='${email}' AND password='${password}';`;

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.length >= 1) {
                const user = results.pop();

                const token = jwt.sign(
                    {email: user.email, username: user.username,},
                    accessTokenSecret
                );

                responseAuthSuccess(res, token, 'Login Successful', {
                    email: user.email,
                    username: user.username,
                });
                return;
            }
            res.status(404).json({message: 'Email or password is wrong'})
        });

        connection.release()
    })
}

module.exports = {
    register, login
}