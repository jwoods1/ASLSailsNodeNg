var moment = require('moment');
module.exports =

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl);
    function DashboardCtrl($scope, $http, $auth, Account, $mdToast, uiCalendarConfig, $mdSidenav){
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
				console.log(data);
			})
		};
		 $('.button-collapse').sideNav({
		      menuWidth: 300, // Default is 240
		      edge: 'right', // Choose the horizontal origin
		      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
		    }
		  );
		   $(".button-collapse").sideNav();
    };