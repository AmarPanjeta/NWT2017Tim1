app.controller('showTutorialController', function($log, $routeParams, $rootScope, $http, $scope){
	$log.log($routeParams.id);
	$rootScope.id = $routeParams.id;
	$rootScope.tutorial;
	$rootScope.komentar = "";
	$rootScope.starsSum;
	$rootScope.komentari;
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

		$log.log("jap");
        $http.get("http://localhost:8085/comment/gettutcoms?idTut=" + $rootScope.id).then(function(res) {

            $rootScope.komentari = res.data;
            $log.log("id: " + $rootScope.id +" ... "  + $rootScope.komentari[0].text);
        });

    $rootScope.getNumber = function(num) {
        return new Array(num);
    }

    $rootScope.getNumberEmpty = function(num) {
    	$log.log(num);
        if(num == NaN || num == undefined) return new Array(5);
        else return new Array(5-num);
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


