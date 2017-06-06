app.controller('registrationController', function($log, $scope, $location, $http, $rootScope){
	$log.log('registration kontroler ucitan');
	$scope.inputType="password";
	
	$rootScope.register=function(){

		if($scope.password1==$scope.password2)
		{
			$scope.user.password=$scope.password1;
			$log.log($scope.user);

			$http.post("http://localhost:8081/user/register",$scope.user).then(function(response){
				$location.path('/');
				return response.data;
			});
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