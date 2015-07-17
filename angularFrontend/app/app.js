//gloabals
//global.$ = global.jQuery = require('jquery');   
//global.moment = require('moment'); 
//styles
//require('../node_modules/angular-material/angular-material');
//require angular and components

var angular = require('angular');
require('angular-ui-router');
require('satellizer');
//require('angular-material');
//require('node-lumx');

//init angular module
require('./app.module');


//route config
require('./route.config');
//angular controllers
require('./features/home/home');



