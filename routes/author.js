const express = require('express')
//memanggil router, router ini bagian dari express
const router = express.Router()
const {
    getAuthors,
    getAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/AuthorController')

//route untuk menampilkan data
router.get('/', getAuthors)

//route untuk mengirim data
router.post('/', addAuthor)
//route untuk menampilkan data
// router.get('/', (req,res) => {
//     res.write('GET Author code')
//     res.end()
// })

//route untuk mengirim data
// router.post('/', (req, res) => {
//     res.write('POST Author code')
//     res.end()
// })

router.get('/:id', getAuthor)

//route untuk mengedit/update data
router.put('/:id', updateAuthor)

//route untuk menghapus data
router.delete('/:id', deleteAuthor)

module.exports = router 