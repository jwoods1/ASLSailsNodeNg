var moment = require('moment');
module.exports =

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl);
    function DashboardCtrl($scope, $http, $auth, Account, $mdToast, uiCalendarConfig, $mdSidenav, $mdBottomSheet, $state){
    	var dashboard = this;
		dashboard.events = [];
		dashboard.clickedCal = function(){
			console.log('clicked cal');
		};
		
		dashboard.clickEvent = function(calEvent, jsEvent, view){
			console.log('Clicked on : '+ calEvent.title);
		};
		dashboard.uiConfig= {
			calendar:{
				height:450,
				editable:true,
				header:{
					left:'month agendaWeek agendaDay',
					center: 'title',
					right: 'today prev,next'
				},
				selectable: true,
				eventClick: dashboard.clickEvent
			}
		};
		
		dashboard.getProfile = function() {
	      Account.getProfile()
	        .success(function(data) {
	          dashboard.user = data;
			  	for (var i = 0; i < data.events.length; i++) {
					var time = data.events[i].start;
					moment(time).format('MMM Do YYYY, h:mm:ss a');
				}
				
				dashboard.events.push(data.events);
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
		dashboard.logout = function(){
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
		dashboard.getProfile();
		
		dashboard.deleteEvent = function(data){
			console.log('delete');
			console.log(data);
			$http.post('api/event/remove', {id: data.id})
			.then(function(data, status){
				dashboard.user.events.splice(data,1);
			})
		};
		dashboard.isOpen = false;
	    dashboard.nav = {
	        isOpen: false,
	        selectedMode: 'md-fling',
	        selectedDirection: 'left'
	      };
		dashboard.openBottomSheet = function(){
			$mdBottomSheet.show({
				templateUrl: './dashboard/events/bottom-sheet.html',
				controller: 'DashboardCtrl',
				controllerAs: 'dashboard'
			});
		};
		dashboard.openCalendar = function(){
			$mdBottomSheet.show({
				template: "<md-bottom-sheet><ui-calendar ui-calendar='dashboard.uiConfig' ng-model='dashboard.events'></ui-calendar></md-bottom-sheet>"

			});
		};
		dashboard.scheduleEvent = function(){
			console.log('clicked');
			$http.post('api/event/schedule',{
				message: {
					title: dashboard.title,
					allDay: dashboard.allDay,
					start: dashboard.startTime,
					end: dashboard.endTime,
					editable: dashboard.isEditable,
					group: dashboard.groupId

				}

			}).then(function(x){
				$mdBottomSheet.cancel();
				console.log(x);
				var data = x.config.data.message;
				var update = $http.get('/api/user/me');
				dashboard.user.events.push(data);


			})

		};

    };
