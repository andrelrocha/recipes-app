const { Router } = require("express");

const { pool, client } = require("./db/dbConnect.js");

const routes = Router();

routes.get('/', function(req, res){
    //res.render('index');   
    pool.connect();
    pool.query('SELECT * FROM recipes ORDER BY id DESC', (err, result) => {
    console.log(err, result);
    res.render('index', {recipes: result.rows});
    // pool.end();
    }) 
});

routes.post('/add', function(req,res){
    client.connect();
    client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', [req.body.name, req.body.ingredients, req.body.directions], (err, result) => {
    console.log(err, result);
    res.redirect('/');
    // client.end();
    });
});

routes.post('/edit', function (req, res) {
    client.connect();
    client.query('UPDATE recipes SET name = $1, ingredients = $2, directions = $3 WHERE id = $4', [req.body.name, req.body.ingredients, req.body.directions, req.body.id], (err, result) => {
        console.log(err, result);
        res.redirect('/');       
    });
});

routes.delete('/delete/:id', function(req, res){
    client.connect();
    client.query('DELETE FROM recipes WHERE id = $1', [req.params.id]);
    res.send(200);
})

module.exports = {
    routes: routes
};