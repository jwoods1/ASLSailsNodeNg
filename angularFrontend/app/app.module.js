module.exports = angular.module('app',['ui.router', 'satellizer'])

	.config(function($authProvider){
		$authProvider.twitter({
			url:'api/user/twitter'
		})
	});