const express = require('express');

const mysqlDb = require('../mysqlDb');

const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await mysqlDb.getConnection().query('SELECT `id`, `title`, `description` FROM `categories`');
    res.send(categories);
});

router.get('/:id', async (req, res) => {
    const category = await mysqlDb.getConnection().query('SELECT * FROM `categories` WHERE `id` = ?', req.params.id);
    res.send(category[0]);
});

router.post('/', async (req, res) => {
    const category = req.body;

    await mysqlDb.getConnection().query(
        'INSERT INTO `categories` (`title`, `description`) VALUES' +
        `(?, ?)`,
        [category.title, category.description]
    );

    const result = await mysqlDb.getConnection().query('SELECT * FROM `categories` WHERE `title` = ?', category.title);

    res.send(result[0]);
});

router.put('/:id', async (req, res) => {
    const editItem = {
        title: req.body.title,
        description: req.body.description,
    };

 await mysqlDb.getConnection().query(
        'UPDATE ?? SET ? where = ?',
        ['categories', {...editItem}, req.params.id]
    );
    res.send('Update successful!');
});

router.delete('/:id', async (req, res) => {
    await mysqlDb.getConnection().query('DELETE FROM `categories` WHERE `id` = ?', req.params.id);

    res.send(req.body.id);
});

module.exports = router;