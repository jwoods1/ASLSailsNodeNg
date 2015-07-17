module.exports =

angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);
    function HomeCtrl($scope, $auth){
    	var vm = this;
    	vm.hello = "world";
		
		vm.login = function(){
			$auth.authenticate('twitter');
		}

    }
