app.controller('pwchangeController', function($log, $scope, $rootScope, $window, $http){
	var uredjeni={};
	$scope.inputTypeUredi="password";

	$scope.select=function($event){
		  var checkbox = $event.target;
  		  var action = (checkbox.checked ? 'add' : 'remove');

  		  if(action === 'add'){
  		  	$scope.inputTypeUredi="text";
  		  }

  		  if(action==='remove'){
  		  	$scope.inputTypeUredi="password";
  		  }
	};

	/*if($window.localStorage.getItem('authdataToken')!=null)
	{
		$http.get('http://localhost:8081/users/search/findUserByUsername?username='+$window.localStorage.getItem("authdataUser").toString()).then(function(vraceni){
			vratioSe=vraceni;
			$log.log(vratioSe);			
		});
	}*/

	$scope.sacuvajPromjene=function(){
		$scope.dataLoading=true;

		if($window.localStorage.getItem('authdataToken')!=null)
		{
			$http.get('http://localhost:8081/user/userinfo?username='+$window.localStorage.getItem("authdataUser").toString()).then(function(vraceni){
				uredjeni=vraceni.data;
				$log.log(uredjeni);
			});

			if($scope.password1==$scope.password2)
			{
				uredjeni.password=$scope.password1;
				$http.put('http://localhost:8081/users/'+uredjeni.id, uredjeni).then(function(response){
					return response.data;
					$location.path('/');
				});
			}
		}

		
	};

});