//gloabals
global.$ = global.jQuery = require('jquery');   
global.moment = require('moment'); 

//require angular and components

var angular = require('angular');
require('angular-ui-router');
require('satellizer');
require('angular-strap');
require('./../node_modules/angular-strap/dist/angular-strap.tpl.js');


require('./libs/calendar');
require('fullcalendar');
//require('angular-material');
//require('node-lumx');

//init angular module
require('./app.module');
//serices
require('./services/account');

//route config
require('./app.config');
//angular controllers
require('./features/home/homeCtrl');
require('./features/users/userCtrl');
require('./features/dashboard/dashboardCtrl');
require('./features/dashboard/events/eventCtrl');



