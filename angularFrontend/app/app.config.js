angular.module('app')

.config(function($stateProvider, $urlRouterProvider,$authProvider) {
  //
  
  $authProvider.twitter({
			url:'api/user/twitter'
		})
		$authProvider.facebook({
			 clientId: '1447949445513827',
			 url: 'api/user/facebook',
		})
		$authProvider.withCredentials = false;
		$authProvider.signupUrl = 'api/user';
  
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "features/home/home.html",
      controller: "HomeCtrl",
      controllerAs: "vm"
    })
     .state('features', {
      url: "/features",
      templateUrl: "features/home/newFeatures.html",
    })
     .state('contactus', {
      url: "/contactus",
      templateUrl: "features/home/contactus.html",
    })
   
    .state('login', {
      url: "/login",
      templateUrl: "features/users/login.html",
      controller: 'UserCtrl',
      controllerAs: 'vm'
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "features/users/signup.html",
      controller: 'UserCtrl',
      controllerAs: 'vm'
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "features/dashboard/dashboard.html",
      controller: 'DashboardCtrl',
      controllerAs: 'vm'
    })
      .state('dashboard.event', {
      url: "/dashboard/event",
      templateUrl: "features/dashboard/event/event.html",
      controller: 'EventCtrl',
      controllerAs: 'vm'
    });
});