const express = require('express'),
      massive = require('massive'),
      authCtrl = require('./authController'),
      app = express();

app.use(express.json());

app.listen(7777, () => console.log('Server running on 7777'));