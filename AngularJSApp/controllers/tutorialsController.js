app.controller('tutorialsController', function($log, $scope, $location, $http, $rootScope){
	$log.log('tutorials kontroler ucitan');

    $rootScope.tutorials = [];


	$rootScope.admin = false;
	$rootScope.prikazi = "Prikazi vise";
	$rootScope.show = false;
    $rootScope.showMore=function () {
        $http.get("http://localhost:8085/tut/getTutorials").then(function(res){
             $log.log("nesto");

        });

        if($rootScope.show == false){
            $rootScope.show = true;
            $rootScope.prikazi = "Prikazi manje";
            $log.log("true");
		}
		else
		{
            $rootScope.show = false;
            $log.log("false");

            $rootScope.prikazi = "Prikazi vise";
		}
    };




});