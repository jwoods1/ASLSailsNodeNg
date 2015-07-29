angular.module('app')

.config(function($stateProvider,$locationProvider, $urlRouterProvider,$authProvider) {
  //
  $authProvider.twitter({
			url:'api/user/twitter'
		})
		$authProvider.facebook({
			 clientId: '1447949445513827',
			 url: 'api/user/facebook',
		})
		$authProvider.withCredentials = false;
		$authProvider.signupUrl = 'api/user/signup';
    $authProvider.loginUrl = 'api/user/login';
    $authProvider.loginRedirect = '/dashboard';
  
  $locationProvider.html5Mode(false);
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "home/home.html",
      controller: "HomeCtrl",
      controllerAs: "vm",
      resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if ($auth.isAuthenticated()) {
              $location.path('/dashboard');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
       }
    })
    .state('login', {
      url: "/login",
      templateUrl: "user/login.html",
      controller: 'UserCtrl',
      controllerAs: 'vm',
       resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if ($auth.isAuthenticated()) {
              $location.path('/dashboard');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
       }
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "user/signup.html",
      controller: 'UserCtrl',
      controllerAs: 'vm',
      resolve: {
              authenticated: function($q, $location, $auth) {
                var deferred = $q.defer();
    
                if ($auth.isAuthenticated()) {
                  $location.path('/dashboard');
                } else {
                  deferred.resolve();
                }
    
                return deferred.promise;
              }
           }
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html",
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard',
      resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
    })
      .state('dashboard.event', {
      url: "/dashboard/event",
      templateUrl: "dashboard/events/event.html",
      controller: 'EventCtrl',
      controllerAs: 'event'
    });
});