app.controller('indexController', function($log, $rootScope,$location, $scope, $window, $http){
	$rootScope.logovann=false;

	/*$rootScope.isActive=function(viewLocation) {
		var active=(viewLocation === $location.url());
		return active;
	}*/

	$rootScope.logovan=function(){
		//return $rootScope.logovann;
		if($window.localStorage.getItem('authdataToken')!=null)
		{
			return true;
		}

		else return false;
	}

	$rootScope.logout=function(){
		$log.log('logout'+$window.localStorage.getItem("authdataToken"));
		$rootScope.token=null;
		$window.localStorage.removeItem("authdataToken");
		$window.localStorage.removeItem("authdataUser");

		$http.defaults.headers.common.Authorization = '';

		$rootScope.logovann=false;
		$location.path('/');

	}
});