app.controller('indexController', function($log, $rootScope,$location){
	$scope.logovann=false;

	$rootScope.isActive=function(viewLocation) {
		var active=(viewLocation === $location.url());
		return active;
	}

	$rootScope.logovan=function(){
		return $scope.logovan;
	}

	$rootScope.login=function(){
		$scope.logovan=true;
	}

	$rootScope.registracija=function(){
		//nesto za registraciju
	}

	$rootScope.logout=function(){
		$scope.logovan=false;
	}

	$rootScope.vratiPocetnu=function(){
		$location.path("/pocetna");
	}
});