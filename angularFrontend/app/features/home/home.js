module.exports =

angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);
    function HomeCtrl($scope, $auth){
    	var vm = this;
    	vm.hello = "world";
		
		vm.twitterLogin= function(){
			$auth.authenticate('twitter');
		}
        vm.facebookLogin = function(){
			$auth.authenticate('facebook');
		}

    };
