module.exports =

angular
    .module('app')
    .controller('EventCtrl', EventCtrl);
    function EventCtrl($scope, $auth){
    	var vm = this;
    	vm.hello = "world";
		vm.signup = function(){
			vm.email;
			vm.password;
			
		}
		
		vm.twitterLogin= function(){
			$auth.authenticate('twitter');
		}
        vm.facebookLogin = function(){
			$auth.authenticate('facebook');
		}

    };