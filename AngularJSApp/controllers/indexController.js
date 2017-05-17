app.controller('indexController', function($log, $rootScope,$location, $scope, $window, $http){
	$rootScope.logovann=false;

	$rootScope.isActive=function(viewLocation) {
		var active=(viewLocation === $location.url());
		return active;
	}

	$rootScope.logovan=function(){
		return $rootScope.logovann;
	}

	$rootScope.logout=function(){
		$log.log('logout'+$window.localStorage.getItem("authdata"));
		$rootScope.token=null;
		$window.localStorage.removeItem("authdata");
		$http.defaults.headers.common.Authorization = '';

		$rootScope.logovann=false;
		$location.path('/');

	}
});