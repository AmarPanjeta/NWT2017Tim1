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
        AuthenticationService.Login($scope.userLogin).then(function(response) {
            //$rootScope.token = responseToken;
            //$window.localStorage.setItem("authdata",$scope.username+responseToken);
            //$http.defaults.headers.common.Authorization = 'Bearer ' + responseToken;
            //$location.path('/');

            $log.log(response);
            $rootScope.logovann=true;
        });
    }
});