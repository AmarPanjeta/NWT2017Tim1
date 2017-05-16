app.controller('indexController', function($log, $rootScope,$location, $scope){
	$scope.logovann=false;

	$rootScope.isActive=function(viewLocation) {
		var active=(viewLocation === $location.url());
		return active;
	}

	$rootScope.logovan=function(){
		return $scope.logovann;
	}

	$rootScope.login=function(){
		$scope.logovann=true;
	}

	$rootScope.registracija=function(){
		//nesto za registraciju
	}

	$rootScope.logout=function(){
		$scope.logovann=false;
	}

	$rootScope.vratiPocetnu=function(){
		$location.path("/");
	}
});