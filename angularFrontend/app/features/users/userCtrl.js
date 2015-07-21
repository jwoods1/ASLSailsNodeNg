module.exports =

angular
    .module('app')
    .controller('UserCtrl', UserCtrl);
	    function UserCtrl($scope, $auth, $alert){
	    	var vm = this;
			vm.hello = 'hello';
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
			            $alert({
			              content: message[0],
			              animation: 'fadeZoomFadeDown',
			              type: 'material',
			              duration: 3
			            });
			          });
			        } else {
			          $alert({
			            content: response.data.message,
			            animation: 'fadeZoomFadeDown',
			            type: 'material',
			            duration: 3
			          });
			        }
			      });
				
			};
			vm.login = function(){
				 $auth.login({ email: vm.email, password: vm.password })
			        .then(function() {
			          $alert({
			            content: 'You have successfully logged in',
			            animation: 'fadeZoomFadeDown',
			            type: 'material',
			            duration: 3
			          });
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
			          $alert({
			            content: 'You have successfully logged in',
			            animation: 'fadeZoomFadeDown',
			            type: 'material',
			            duration: 3
			          });
			        })
			        .catch(function(response) {
			          $alert({
			            content: response.data ? response.data.message : response,
			            animation: 'fadeZoomFadeDown',
			            type: 'material',
			            duration: 3
			          });
			        });
			    };
			vm.logout = function(){
				if (!$auth.isAuthenticated()) {
		        return;
			    }
			    $auth.logout()
			      .then(function() {
			        console.log({
			          content: 'You have been logged out',
			          animation: 'fadeZoomFadeDown',
			          type: 'material',
			          duration: 3
			        });
			      });
			};

			
    };