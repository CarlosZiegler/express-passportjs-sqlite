require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Cors = require('cors');
const app = express();
const AuthRoutes = require('./src/routes/AuthRoutes');
const dbConnection = require('./src/database/configs/db.config');
const { swaggerUI, swaggerDocs, options } = require('./src/docs/Swagger');

require('./src/auth/auth');

try {
  dbConnection.authenticate();
  console.log('Connection Database established.');
} catch (error) {
  console.log('Unable to connect to db: ', error);
}

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));
app.use('/auth', AuthRoutes);

//Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});
