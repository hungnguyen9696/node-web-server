const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
//process.env is a obj store all our envi variables as key vlue pairs

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

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        
        pageTitle: 'projects page'
    });
    
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});