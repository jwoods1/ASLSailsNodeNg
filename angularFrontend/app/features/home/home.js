angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);
    function HomeCtrl($scope, $http){
    	var vm = this;
		 $scope.test = $http.get('/api/user')
		     .success(function(data, status, headers, config) {
			     console.log(data[0].name);
			     $scope.name = data[0].name;
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		    });
    }
