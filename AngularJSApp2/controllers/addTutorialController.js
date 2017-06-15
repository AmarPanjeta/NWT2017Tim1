
/**
 * Created by Ivona on 14.06.2017..
 */
app.controller('addTutorialController', function($log, $routeParams, $rootScope, $http, $scope,$location){
    $log.log("Ucitan add controller");
    $rootScope.naslov = "";
    $rootScope.opis = "";
    $rootScope.tekst = "";
    $rootScope.nokTekst = "";
    $rootScope.dodaj = function () {
        $rootScope.tekst = $scope.tekst;
        $rootScope.opis = $scope.opis;
        $rootScope.naslov = $scope.naslov;
        if($rootScope.tekst == "" || $rootScope.opis == "" || $rootScope.naslov == "")
        {
            $rootScope.nokTekst = "Morate popuniti sva polja";
        }
        else {
            $http.post("http://localhost:8085/tut/create", {title:$rootScope.naslov, text: $rootScope.tekst, about: $rootScope.opis, username:"ne znam sad"}).then(function () {
                $log.log("OK");
                $location.path('/tutorials');
                //treba tagove TODO
            })


        }

    }

    $rootScope.odustani=function () {
        $location.path('/tutorials');
    }

});