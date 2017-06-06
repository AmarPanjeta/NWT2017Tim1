app.service('AuthenticationService', function($http, $window, $log, $q){
	var service={};
	service.Login=Login;
  service.IsAdmin=IsAdmin;
  service.HasAdmin=HasAdmin;
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
          }).then(handleSuccess, handleError('Login nije omogucen. Provjerite pristupne podatke.'));
      }

      function IsAdmin(un){
        var deferred=$q.defer();
        $http.get("http://localhost:8088/user/"+un+"/isAdmin").success(function(response){
          deferred.resolve(response);
        });

        return deferred.promise;
      }

      function HasAdmin(un){
        return $http.get("http://localhost:8088/user/"+un+'/imaPrivilegije').then(handleSuccess, handleError('Ne znam'));
      }

//////////////////////////
      function handleSuccess(res) {
            return {success:true, response:res.data};
        } 

    function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
    }
});


