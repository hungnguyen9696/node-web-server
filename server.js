const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} `;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next)=> {
//     res.render('maintenance.hbs');

// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear(); 
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        
        pageTitle: 'home page',
        welcomeMessage: 'welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        
        pageTitle: 'about page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to load'
    });
    
});

app.listen(3000);