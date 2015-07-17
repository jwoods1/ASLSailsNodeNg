//gloabals
//global.$ = global.jQuery = require('jquery');   
//global.moment = require('moment'); 
//styles'

require('./styles/main.scss');
//require angular and components

var angular = require('angular');
require('angular-ui-router');
require('satellizer');
//require('angular-material');
//require('node-lumx');

//init angular module
require('./app.module');


//route config
require('./app.config');
//angular controllers
require('./features/home/homeCtrl');
require('./features/users/userCtrl');
require('./features/dashboard/dashboardCtrl');
require('./features/dashboard/events/eventCtrl');



