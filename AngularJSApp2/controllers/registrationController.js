app.controller('registrationController', function($log, $scope, $location, $http, $rootScope, AuthenticationService, FlashService){
	$log.log('registration kontroler ucitan');
	$scope.inputType="password";
	
	$rootScope.register=function(){

		if($scope.password1==$scope.password2)
		{
			$scope.user.password=$scope.password1;

			AuthenticationService.Register($scope.user).then(function(response){
				if(response.success)
				{
					FlashService.Success("Uspjesno ste se registrovali. Potvrdite registraciju emailom kako biste nastavili koristenje C++ ucionice.");
				}

				else FlashService.Error(response.message);
			});

			$location.path('/');
		}
	}


	$scope.select=function($event){
		  var checkbox = $event.target;
  		  var action = (checkbox.checked ? 'add' : 'remove');

  		  if(action === 'add'){
  		  	$scope.inputType="text";
  		  }

  		  if(action==='remove'){
  		  	$scope.inputType="password";
  		  }
	};



});