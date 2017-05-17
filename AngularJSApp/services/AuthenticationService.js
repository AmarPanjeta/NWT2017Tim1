app.service('AuthenticationService', function($http, $window, UserService, $log){
	var service={};
	service.Login=Login;

	return service;

	/*function Login(un, pw){
        return $http.post('http://localhost:8080/users-client/user/login', {username:un, password:pw}).then(function(response){
            return response.data; //token
        });
    }*/


	function Login(user){
        $log.log(user);
        return $http.post('http://localhost:8081/user/login', user).then(function(response){
            return response; //token
            $log.log(response);
        });
    }
});