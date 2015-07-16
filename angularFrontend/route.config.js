angular.module('app')

.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "features/home/home.html",
      controller: 'HomeCtrl',
      controllerAs: 'vm'
    });
   
});