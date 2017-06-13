app.controller('indexController', function($log, $rootScope,$location, $scope, $q, $window, $http, AuthenticationService){

	$rootScope.logovan=function(){
		if($window.localStorage.getItem('authdataToken')!=null && $window.localStorage.getItem('authdataUser')!=null)
		{
			return true;
		}

		else return false;
	}

	$rootScope.logout=function(){		
		$window.localStorage.removeItem("authdataToken");
		$window.localStorage.removeItem("authdataUser");
		$http.defaults.headers.common.Authorization = '';
		$location.path('/');
	}

});