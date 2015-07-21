module.exports =

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl);
    function DashboardCtrl($scope, $auth, Account, $alert){
    	var vm = this;
    	
		vm.getProfile = function() {
	      Account.getProfile()
	        .success(function(data) {
	          vm.user = data;
              console.log(vm.user);
	        })
	        .error(function(error) {
	          console.log({
	            content: error.message,
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
		vm.getProfile();

    };