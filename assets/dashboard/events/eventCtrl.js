module.exports =

angular
    .module('app')
    .controller('EventCtrl', EventCtrl);
    function EventCtrl($scope, $http, $mdBottomSheet){
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
		};
		event.openBottomSheet = function(){
			$mdBottomSheet.show({
			templateUrl: './dashboard/events/bottom-sheet.html'
		});
		};
		
    };