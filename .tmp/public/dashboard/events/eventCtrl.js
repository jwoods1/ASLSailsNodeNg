module.exports =

angular
    .module('app')
    .controller('EventCtrl', EventCtrl);
    function EventCtrl($scope, $http){
    	var event = this;
		
		event.scheduleEvent = function(){
			$http.post('api/event/schedule',{
				message: {
					title:event.title,
					allDay: event.allDay,
					start: event.startTime,
					end: event.endTime,
					editable: event.isEditable,
					group: event.groupId
				
				}
			})
			console.log("sent");
		};

		
    };