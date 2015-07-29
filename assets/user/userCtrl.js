module.exports =

angular
    .module('app')
    .controller('UserCtrl', UserCtrl);
	    function UserCtrl($scope, $auth, $mdToast){
	    	var vm = this;
	    	//user non social signup / login / logout
			vm.signup = function(){
				vm.email;
				vm.password;
				$auth.signup({
			        displayName: vm.displayName,
			        email: vm.email,
			        password: vm.password
			      }).catch(function(response) {
			        if (typeof response.data.message === 'object') {
			          angular.forEach(response.data.message, function(message) {
			            $mdToast.showSimple(message[0]);
			          });
			        } else {
						$mdToast.showSimple(response.data.message);
			        }
			      });
				
			};
			vm.login = function(){
				 $auth.login({ email: vm.email, password: vm.password })
			        .then(function() {
			      		$mdToast.showSimple('You have successfully logged in');
			        })
			        .catch(function(response) {
			          console.log({
			            content: response.data.message,
			            animation: 'fadeZoomFadeDown',
			            type: 'material',
			            duration: 3
			          });
			        });
			    };
				//social sign in 
			vm.authenticate = function(provider) {
				console.log('clicked');
			      $auth.authenticate(provider)
			        .then(function() {
			         $mdToast.showSimple('You have successfully logged in');
			        })
			        .catch(function(response) {
						$mdToast.showSimple( response.data ? response.data.message : response);
			        });
			    };
			

			
    };