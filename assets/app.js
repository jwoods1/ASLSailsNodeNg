//gloabals
global.$ = global.jQuery = require('jquery');   
global.moment = require('moment'); 
//global.Materialize = require('./libs/materialize');

require('fullcalendar');
require('hammerjs');

var anglar = require('angular');
require('angular-ui-router');
require('satellizer');
require('angular-aria');
require('angular-animate');
require('angular-strap');
require('angular-ui-calendar');
require('./libs/angular-strap-templates');

//init angular module
require('./app.module');
//serices
require('./services/account');

//route config
require('./app.config');
require('./home/homeCtrl');
require('./user/userCtrl');
require('./dashboard/dashboardCtrl');
require('./dashboard/events/eventCtrl');