const express = require('express');
const app = express();
const ApiRouter = require('./routes/api_router');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('common'));
app.use('/api', ApiRouter);

const expressSwagger = require('express-swagger-generator')(app);

const options = {
  swaggerDefinition: {
    info: {
      description: 'Movchan Maxim 2nd lab of WebProgbase',
      title: 'lab2',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    produces: ["application/json"],
  },
  basedir: __dirname,
  files: ['./routes/**/*.js', './models/**/*.js'],
};
expressSwagger(options);
app.listen(3000);
