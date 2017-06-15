app.controller('editTutorialController', function($log, $routeParams, $rootScope, $http, $scope, $location){
	$log.log($routeParams.id);
	$rootScope.id = $routeParams.id;
	$rootScope.tutorial;
	$rootScope.komentar = "";
	$rootScope.starsSum;
	$rootScope.upaljena = [1,1,1,1,1];
	$rootScope.ugasena = [0,0,0,0,0];
	$rootScope.glasanje = true;




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



    $rootScope.dodaj = function () {
        $http.post('http://localhost:8085/tut/delete?id='+$rootScope.tutorial.id+'&username=ivona').then(function () {

        }).then(function () {
            $http.post("http://localhost:8085/tut/create",
				{title:$rootScope.tutorial.title, text: $rootScope.tutorial.text, about: $rootScope.tutorial.about, username:"ne znam sad"}).then(function () {
                $log.log("OK");
                $location.path('/tutorials');
                //treba tagove TODO
            })
        })
    }

    $rootScope.odustani = function () {
        $location.path('/tutorials');
    }

});


