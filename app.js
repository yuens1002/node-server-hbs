const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();


//get handler for a http request
// header is in request
//
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
  // return 'test'
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
  // return 'test'
});

app.set('view engine', 'hbs');


app.use((request, response, next)=> {
  let now = new Date().toString();
  console.log(`${now}: ${request.method} ${request.url}`);
  let log = `${now}: ${request.method} ${request.url}`;
  fs.appendFileSync('server.log', log + '\n');
  next();
});

app.use((request, response, next) => {
  response.render('maintenace.hbs', {
    pageTitle: 'site is in maintenace, will be right back',
    pageContent: 'don\'t worry, it\'s okay.  grab a cup of coffee, relax and breath... all is fine!'
  });
})

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('index.hbs', {
      pageTitle: 'Home',
      pageContent: 'this is a temporary homepage'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
      pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    error: 'unable to handle request'
  });
});

app.listen(3100, () => {
  console.log('server is up on port 3100');
});
