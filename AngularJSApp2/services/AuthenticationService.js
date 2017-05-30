app.service('AuthenticationService', function($http, $window, $log){
	var service={};
	service.Login=Login;

	return service;


    /*$http({
      url: 'http://localhost:8081/user/login',
      method: 'POST',
      transformResponse: [function (data) {
          return data;
      }]
    });*/

	  /*function Login(un, pw){
        return $http({
            method: 'POST',
            url: 'http://localhost:8081/user/login',
            data: {"username":un, "password":pw},
            headers: {
                'Content-Type': 'text/plain'
            }}).then(function(result) {
                   $log.log(result);
               }, function(error) {
                   $log.log(error);
               });
            }*/

      function Login(un,pw){
        return $http({
            url: 'http://localhost:8081/user/login',
            method: 'POST',
            data: {"username":un, "password":pw},
            transformResponse: undefined
          }).then(function(response){
            return response.data;
          });
      }
});


