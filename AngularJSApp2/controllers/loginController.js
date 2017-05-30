app.controller('loginController', function($rootScope, AuthenticationService, $log, $scope, $http, $location, $window){

	/*$rootScope.login=function(){
		AuthenticationService.Login($scope.username, $scope.password, function(response){
    		if (response.success) {
    				$rootScope.token=token;

    				$rootScope.globals = {
		                currentUser: {
		                    username: username,
		                    authdata: authdata
		                }
		            };

		            $window.localStorage.setItem("authdata",$scope.username+token;

					$http.defaults.headers.common.Authorization='Basic'+token;
					$log.log("logovan sam"+$scope.username);
					$location.path('/');
                } 
            else {  
                    FlashService.Error(response.message);
                }

    	});
	}*/



    $rootScope.login = function() {
        $log.log($scope.userLogin);
        
        AuthenticationService.Login($scope.userLogin.username, $scope.userLogin.password).then(function(response) {
            $rootScope.token = response;
            $window.localStorage.setItem("authdataToken",response);
            $window.localStorage.setItem("authdataUser", $scope.userLogin.username);
            $http.defaults.headers.common.Authorization = 'Bearer ' + response;
            $rootScope.usernameHello=$scope.userLogin.username;

            $log.log(response+"    "+$window.localStorage.getItem("authdataUser"));
            $rootScope.logovann=true;
            $location.path('/');
       });
    }
});