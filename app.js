const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3100;

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

// app.use((request, response, next) => {
//   response.render('maintenace.hbs', {
//     pageTitle: 'site is in maintenace, will be right back',
//     pageContent: 'don\'t worry, it\'s okay.  grab a cup of coffee, relax and breath... all is fine!'
//   });
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('index.hbs', {
      pageTitle: 'Home',
      pageContent: 'Welcome, this is a placeholder text to be replaced later'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
      pageTitle: 'About',
      pageContent: 'About page dummy text to be replaced later'
  });
});

app.get('/projects', (request, response) => {
  response.render('projects.hbs', {
      pageTitle: 'Projects',
      pageContent: 'Placeholder text for what will be replaced with relavent context'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    error: 'unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
