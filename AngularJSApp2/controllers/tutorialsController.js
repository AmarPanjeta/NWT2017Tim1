app.controller('tutorialsController', function($log, $scope, $location, $http, $rootScope){
    $log.log('tutorials kontroler ucitan');

    $rootScope.tutorials = [];
    $rootScope.search = "";

    $rootScope.admin = false;
    $rootScope.prikazi = "Prikazi vise";
    $rootScope.show = false;
    $rootScope.j = 0;

    $http.get("http://localhost:8085/tut/getTutorials").then(function(res){
        $rootScope.tutorials = res.data;


    }).then(function () {
        angular.forEach($rootScope.tutorials, function(tut){
            tut.tags = [];
            $http.get("http://localhost:8085/tag/gettuttags?idTut=" + tut.id).then(function(res) {

                tut.tags = res.data;

            });
        });
    }).then(function () {
        angular.forEach($rootScope.tutorials, function(tut){
            tut.stars;
            $http.get("http://localhost:8085/startag/gettutkorisnickitagsuma?idTut=" + tut.id).then(function(res) {

                tut.stars = res.data;
            });
        });

    });

    $rootScope.showTutorial = function(id){
        $location.path('/showTutorial/' + id);
    }
    $rootScope.getNumber = function(num) {
        return new Array(num);
    }

    $rootScope.getNumberEmpty = function(num) {
        return new Array(5-num);
    }

    $rootScope.pretraga = function () {
        $rootScope.search = $scope.search;
        $http.get("http://localhost:8085/tut/gettutbytitle?word="+$rootScope.search).then(function(res){
            $rootScope.tutorials = res.data;
        }).then(function () {
            angular.forEach($rootScope.tutorials, function (tut) {
                tut.stars;
                $http.get("http://localhost:8085/startag/gettutkorisnickitagsuma?idTut=" + tut.id).then(function (res) {

                    tut.stars = res.data;

                });
            });
        });
        if($rootScope.search ==""){
            $http.get("http://localhost:8085/tut/getTutorials").then(function(res){
                $rootScope.tutorials = res.data;

            }).then(function () {
                angular.forEach($rootScope.tutorials, function (tut) {
                    tut.stars;
                    $http.get("http://localhost:8085/startag/gettutkorisnickitagsuma?idTut=" + tut.id).then(function (res) {

                        tut.stars = res.data;

                    });
                });
            });
        }

    }
    $rootScope.showMore=function () {


        if($rootScope.show == false){
            $rootScope.show = true;
            $rootScope.prikazi = "Prikazi manje";

        }
        else
        {
            $rootScope.show = false;


            $rootScope.prikazi = "Prikazi vise";
        }
    };




});