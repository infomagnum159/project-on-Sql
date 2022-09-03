const express = require('express');

const mysqlDb = require('../mysqlDb');

const router = express.Router();

router.get('/', async (req, res) => {
    const locations = await mysqlDb.getConnection().query('SELECT `id`, `title` FROM `places`');
    res.send(locations);
});

router.get('/:id', async (req, res) => {
    const location = await mysqlDb.getConnection().query('SELECT * FROM `places` WHERE `id` = ?', req.params.id);
    res.send(location[0]);
});

router.post('/', async (req, res) => {
    const location = req.body;

    await mysqlDb.getConnection().query(
        'INSERT INTO `places` (`title`, `description`) VALUES' +
        `(?, ?)`,
        [location.title, location.description]
    );

    const result = await mysqlDb.getConnection().query('SELECT * FROM `places` WHERE `title` = ?', location.title);

    res.send(result[0]);
});

router.put('/:id', async (req, res) => {
    const editItem = {
        title: req.body.title,
        description: req.body.description,
    };

    await mysqlDb.getConnection().query(
        'UPDATE ?? SET ? where = ?',
        ['places', {...editItem}, req.params.id]
    );
    res.send('Update successful!');
});

router.delete('/:id', async (req, res) => {
    await mysqlDb.getConnection().query('DELETE FROM `places` WHERE `id` = ?', req.params.id);

    res.send(req.body.id);
});

module.exports = router;