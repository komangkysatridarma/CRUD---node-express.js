const express = require('express')
const mysql = require('mysql2')
const bookRoute = require('./routes/book')
const authorRoute = require('./routes/author')
const authRoute = require('./routes/auth')
const dbConfig = require('./config/database')
const pool = mysql.createPool(dbConfig)
const authenticateJWT = require('./middleware/auth')
const cors = require('cors')

pool.on('error', (err) => {
    console.log(err)
})

//inisialisasi express
const app = express()

//inisialisasi port
const port = 3000
//inisialisasi cors
app.use(cors())
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

app.use('/book', authenticateJWT, bookRoute)
app.use('/author', authorRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`)
})

