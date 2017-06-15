app.controller('tutorialsController', function($log, $scope, $location, $http, $rootScope, AuthenticationService, $window){
    $log.log('tutorials kontroler ucitan');

    $rootScope.tutorials = [];
    $rootScope.search = "";

    $rootScope.admin = true;
    $rootScope.prikazi = "Prikazi vise";
    $rootScope.show = false;
    $rootScope.j = 0;
    $rootScope.ucitano = false;

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
                $rootScope.ucitano = true;
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
        if(num == NaN || num == undefined) return new Array(5);
        else return new Array(5-num);

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

    $rootScope.dodaj = function () {
        $location.path('/addTutorial');
    }

    $rootScope.brisi = function (id) {
        $http.post('http://localhost:8085/tut/delete?id='+id+'&username=ivona').then(function () {
            $http.get("http://localhost:8085/tut/getTutorials").then(function(res) {
                $rootScope.tutorials = res.data;
            });
        })
    }

    $rootScope.uredi = function (id) {
        $location.path('/editTutorial/'+id);
    }




});