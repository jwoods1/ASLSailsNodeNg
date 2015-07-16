//require angular and components
var angular = require('angular');
require('angular-ui-router');

//init angular module
var app = angular.module('app',['ui.router']);
//route config
require('./route.config');
//angular controllers
require('./features/home/home');



