app.controller('loginController', function($rootScope,AuthenticationService,$log, $scope, $http, $location, $window, FlashService){
    $rootScope.login = function() {        
        AuthenticationService.Login($scope.userLogin.username, $scope.userLogin.password).then(function(response) {

            if(response.success)
            {
                $window.localStorage.setItem("authdataToken",response.response.token);
                $window.localStorage.setItem("authdataUser", $scope.userLogin.username);

                $http.defaults.headers.common.Authorization = 'Bearer ' + response.response.token;
                $rootScope.usernameHello=$scope.userLogin.username;
                $location.path('/');
            }

            else
            {
                FlashService.Error(response.message);
            }
            
        });
    }
});