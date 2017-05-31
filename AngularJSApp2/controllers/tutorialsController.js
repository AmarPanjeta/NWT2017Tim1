app.controller('tutorialsController', function($log, $scope, $location, $http, $rootScope){
    $log.log('tutorials kontroler ucitan');

    $rootScope.tutorials = [];
	$rootScope.tagovi;
    $rootScope.search = "";

    $rootScope.admin = false;
    $rootScope.prikazi = "Prikazi vise";
    $rootScope.show = false;

    $http.get("http://localhost:8085/tut/getTutorials").then(function(res){
        $rootScope.tutorials = res.data;
    });


    $rootScope.pretraga = function () {
        $rootScope.search = $scope.search;
        $http.get("http://localhost:8085/tut/gettutbytitle?searchWord="+$rootScope.search).then(function(res){
            $rootScope.tutorials = res.data;
        });
        if($rootScope.search ==""){
            $http.get("http://localhost:8085/tut/getTutorials").then(function(res){
                $rootScope.tutorials = res.data;
            });
        }

    }
    $rootScope.showMore=function () {


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