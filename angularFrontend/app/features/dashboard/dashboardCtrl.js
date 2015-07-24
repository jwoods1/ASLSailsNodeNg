var moment = require('moment');
module.exports =

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl);
    function DashboardCtrl($scope, $http, $auth, Account, $alert, uiCalendarConfig){
    	var vm = this;
		vm.events = [];
		$http.get('/api/event/')
			.then(function(events){
				for (var i = 0; i < events.data.length; i++) {
					var time = events.data[i].start;
					moment(time).format('MMM Do YYYY, h:mm:ss a');
				}
				
				vm.events.push(events.data);
				console.log(vm.events);
			});
		
		vm.clickedCal = function(){
			console.log('clicked cal');
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
				selectable: true,
				select: function(start, end, jsEvent, view){
					console.log(start);
					console.log(jsEvent);
					console.log(view);
				}
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