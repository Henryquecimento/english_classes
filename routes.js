const express = require('express');
const teachers = require('./teachers');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.redirect('/teachers');
});

routes.get('/teachers', teachers.index);

routes.get('/teachers/create', (req, res) => {
    return res.render('teachers/create');
})

routes.get('/teachers/:id', teachers.show);

routes.get('/teachers/:id/edit', teachers.edit);

routes.post('/teachers', teachers.post);

routes.put('/teachers', teachers.put);

routes.delete('/teachers', teachers.delete);


routes.get('/students', (req, res) => {
    return res.render('./students/student')
})

module.exports = routes;