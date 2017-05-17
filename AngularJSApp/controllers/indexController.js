app.controller('indexController', function($log, $rootScope,$location, $scope){
	$rootScope.logovann=false;

	$rootScope.isActive=function(viewLocation) {
		var active=(viewLocation === $location.url());
		return active;
	}

	$rootScope.logovan=function(){
		return $rootScope.logovann;
	}

	$rootScope.logout=function(){
		$log.log('logout');
		$rootScope.logovann=false;
	}
});