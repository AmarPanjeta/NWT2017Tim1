app.controller('showTutorialController', function($log, $routeParams, $rootScope, $http, $scope){
	$log.log($routeParams.id);
	$rootScope.id = $routeParams.id;
	$rootScope.tutorial;
	$rootScope.komentar = "";
	$rootScope.starsSum;
	$rootScope.upaljena = [1,1,1,1,1];
	$rootScope.ugasena = [0,0,0,0,0];
	$rootScope.glasanje = true;


		$rootScope.dodajKomentar = function () {
			$rootScope.komentar = $scope.komentar;

		}

		$http.get("http://localhost:8085/tut/gettutbyid?id=" + $rootScope.id).then(function(res) {
			$rootScope.tutorial = res.data;
		}).then(function () {
			$rootScope.tutorial.tags = [];
				$http.get("http://localhost:8085/tag/gettuttags?idTut=" + $rootScope.id).then(function(res) {

					$rootScope.tutorial.tags = res.data;
				});
			}).then(function () {
				$http.get("http://localhost:8085/startag/gettutkorisnickitagsuma?idTut=" + $rootScope.id).then(function(res) {

					$rootScope.starsSum = res.data;
				});
			});

    $rootScope.getNumber = function(num) {
        return new Array(num);
    }

    $rootScope.getNumberEmpty = function(num) {
        return new Array(5-num);
    }

    $rootScope.zvijezda = function (broj) {

			for(i = 0; i < broj; i++) {$rootScope.upaljena[i] = 0; $rootScope.ugasena[i] = 1;}
		$http.post("http://localhost:8085/startag/addkorisnickitagtotut?idTut="+$rootScope.id+"&idTag="+broj).then(function () {
			$rootScope.glasanje = false;
        }).then(function () {
            $http.get("http://localhost:8085/startag/gettutkorisnickitagsuma?idTut=" + $rootScope.id).then(function(res) {

                $rootScope.starsSum = res.data;
            });
        });
    }

});


