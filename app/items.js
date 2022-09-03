const express = require('express');
const path = require('path');
const multer = require('multer');
// const nanoid = require('nanoid');
const uniqId = require('uniqid')
const config = require('../config');
const mysqlDb = require('../mysqlDb');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, uniqId() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const items = await mysqlDb.getConnection().query('SELECT * FROM `items`');
    res.send(items);
});

router.get('/:id', async (req, res) => {
    const item = await mysqlDb.getConnection().query('SELECT * FROM `items` WHERE `id` = ?', req.params.id);
    res.send(item[0]);
});

router.post('/', upload.single('image'), async (req, res) => {
    const item = req.body;

    if(req.file){
        item.image = req.file.filename;
    }

    await mysqlDb.getConnection().query(
        'INSERT INTO ?? (`categories_id`, `places_id`, `title`, `description`, `image`) VALUES' +
        `(?, ?, ?, ?, ?)`,
        ['items', item.categories_id, item.places_id, item.title, item.description, item.image]
    );

    const result = await mysqlDb.getConnection().query('SELECT * FROM `items` WHERE `item_name` = ?', item.title);
    res.send({
    ...item,
    id: result.insertId
  });
});

router.put ('/:id', upload.single('image'), async (req, res) => {
    const editItem = {
        categories_id: req.body.categories_id,
        places_id: req.body.places_id,
        title: req.body.title,
        description: req.body.description,
    };

    if (req.file) {
        editItem.image = req.file.filename;
    }

   await mysqlDb.getConnection().query(
        'UPDATE ?? SET ? where = ?',
        ['items', {...editItem}, req.params.id]
    );
    res.send({message: "Updated"});
});

router.delete('/:id', async (req, res) => {
    await mysqlDb.getConnection().query('DELETE FROM `items` WHERE `id` = ?', req.params.id);

    res.send(req.body.id);
});

module.exports = router;