const { Router } = require("express");

const { pool, client } = require("./db/dbConnect.js");
const { json } = require("body-parser");

const routes = Router();

routes.get('/', function(req, res){  
    pool.connect();
    pool.query('SELECT * FROM recipes ORDER BY id DESC', (err, result) => {;
        res.render('index', {recipes: result.rows});
    }) 
});

routes.post('/add', function(req,res){
    client.connect();
    client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', [req.body.name, req.body.ingredients, req.body.directions], (err, result) => {
        res.status(201).redirect('/');
    });
});

routes.post('/edit', function (req, res) {
    client.connect();
    client.query('UPDATE recipes SET name = $1, ingredients = $2, directions = $3 WHERE id = $4', [req.body.name, req.body.ingredients, req.body.directions, req.body.id], (err, result) => {
        res.status(200).redirect('/');
    });
});

routes.delete('/delete/:id', function(req, res){
    client.connect();
    client.query('DELETE FROM recipes WHERE id = $1', [req.params.id]);
    res.status(204).send(json({message: 'Deleted Successfully'}));
})

module.exports = {
    routes: routes
};