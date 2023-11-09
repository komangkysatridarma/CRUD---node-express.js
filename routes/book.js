const express = require('express')
//memanggil router, router ini bagian dari express
const router = express.Router()
const {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/BookController')

//route untuk menampilkan data
router.get('/', getBooks)

//route untuk mengirim data
router.post('/', addBook)
//route untuk menampilkan data
// router.get('/', (req,res) => {
//     res.write('GET book code')
//     res.end()
// })

//route untuk mengirim data
// router.post('/', (req, res) => {
//     res.write('POST book code')
//     res.end()
// })

router.get('/:id', getBook)

//route untuk mengedit/update data
router.put('/:id', updateBook)

//route untuk menghapus data
router.delete('/:id', deleteBook)

module.exports = router 