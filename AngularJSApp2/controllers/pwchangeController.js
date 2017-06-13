app.controller('pwchangeController', function($log, $scope, $rootScope, $window, $http, FlashService, $location){
	var uredjeni={};
	$scope.inputTypeUredi="password";
	$scope.resetPassworda=false;

	if($window.localStorage.getItem('authdataToken')!=null)
	{
		$http.get('http://localhost:8081/user/userinfo?username='+$window.localStorage.getItem("authdataUser").toString()).then(function(response){
			$scope.vratioSe=response.data;
		});
	}

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

	$scope.resetPassword=function()
	{
		$http.get('http://localhost:8081/user/sendrequest?email='+$scope.vratioSe.email).then(function(response){
			if(response.status==200)
			{
				FlashService.Success("Aktivacijski kod poslan je na Vas mail.", false);
				$scope.resetPassworda=true;
			}

			else
			{
				FlashService.Error("Ne mozemo Vam poslati aktivacijski kod. Pokusajte ponovo.", false);
			}
		});

	};

	$scope.provjeriForgotPw=function()
	{
		//provjeriti u links da li je postavljen link za forgot i da li se podudara string
		$http.get('http://localhost:8081/links/search/findByUserUsername?username='+$window.localStorage.getItem("authdataUser").toString()).then(function(response){
			if($scope.forgotPassword===response.data.forgotPassword)
			{
				$log.log("jesteee");
				$scope.resetPassworda=false;
				$scope.resetPasswordaUnesenString=true;
			}

			else
			{
				$log.log("nijee");
				$location.path('/pwchange');
				FlashService.Error("Niste unijeli tacan aktivacijski kod. Pokusajte ponovo.", false);
			}
		});
	};

	$scope.sacuvajPromjene=function(){
		if($scope.password1==$scope.password2)
		{
			$http.post('http://localhost:8081/user/resetpassword/'+$scope.forgotPassword,{"password":$scope.password1, "passwordRepeat":$scope.password1}).then(function(response){
				$location.path('/');
				$log.log("okej");
				FlashService.Success("Uspjesno ste resetovali password.", false);
			});
		}
	};		

});