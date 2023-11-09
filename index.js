const express = require('express')
const mysql = require('mysql2')
const bookRoute = require('./routes/book')
const authorRoute = require('./routes/author')
const dbConfig = require('./config/database')
const pool = mysql.createPool(dbConfig)

pool.on('error', (err) => {
    console.log(err)
})

//inisialisasi express
const app = express()
//inisialisasi port
const port = 3000
//middeleware json perser
app.use(express.json())
//middelewere request body
app.use(express.urlencoded({
    extended: true
}))

//membuat parameter harus diawali :
app.get('/contohparameter/:username/:jurusan/:kelas/:waifu', (req,res) => {
    res.json(req.params)
})

//contohparam?nama=komang&kelas=11&jurusan=pplg
app.get('/contohparam', (req,res) => {
    res.json(req.query)
})

app.get('/', (req, res) => {
    res.write('Hello World')
    res.end()
})

app.use('/book', bookRoute)
app.use('/author', authorRoute)

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`)
})