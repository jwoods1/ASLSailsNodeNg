module.exports =

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl);
    function DashboardCtrl($scope, $auth, Account, $alert, uiCalendarConfig){
    	var vm = this;
    	vm.events = [];
		vm.clickedCal = function(){
			alert('clicked cal');
		};
		vm.uiConfig= {
			calendar:{
				height:450,
				editable:true,
				header:{
					left:'month basicWeek basicDay agendaWeek agendaDay',
					center: 'title',
					right: 'today prev,next'
				},
				dayClick: vm.clickedCal
			}
		};
		
		
		
		
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