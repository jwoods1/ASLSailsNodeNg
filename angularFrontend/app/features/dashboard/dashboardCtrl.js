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
		
		vm.getProfile();

    };