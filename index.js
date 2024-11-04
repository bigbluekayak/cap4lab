const express = require('express');
const db = require('./db');
const { v4 } = require('uuid');
const { engine } = require('express-handlebars');

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/leads', async(req, res) => {
    try {
        const response = await db.query('SELECT * FROM salesforce.Lead ORDER BY createddate DESC');
        res.render('leads', {rows: response.rows});
    } catch (err) {
        console.log(err);
        res.render('500', {err: err});
    }
    
});

app.get('/accounts', async(req, res) => {
    try {
        const response = await db.query('SELECT * FROM salesforce.Account ORDER BY createddate DESC');
        res.render('accounts', {rows: response.rows});
    } catch (err) {
        console.log(err);
        res.render('500', {err: err});
    }
    
});

app.get('/', (req, res) => {
    res.render('home');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`⚡️ Listening on port ${port}...`);
});