app.controller('tasksController', function($log, $http, $rootScope, $scope, $location, $window){
	$log.log('tasks controller ucitan');
	$scope.selIdx= -1;

	$http.get('http://localhost:8088/tasks').then(function(response){
		if(response!=null)
		{
			$log.log(response.data._embedded.tasks);
			$rootScope.tasks=response.data._embedded.tasks;
		}

		else $log.log('nesto ne valja');
	});


	$scope.selectTask=function(task,idx){
		if($scope.selectedTask!=null){
			$scope.selectedTask=null;
		}

		else{
			$scope.selectedTask=task;
			$scope.selIdx=idx;
		}
		
	}

	$scope.isSelTask=function(task){
		return $scope.selectedTask===task;
	}

	$scope.prikaziDetaljeTaska=function(){
		$location.path('/detailedTask');
	}

	$scope.prebaciDodajTask=function(){
		$location.path('addTask');
	}

	$scope.dodajNoviTask=function(){
		var a=$rootScope.logovan();
		$log.log($window.localStorage.getItem('authdataUser'));
		if(a)
		{
			$scope.noviTask.username=$window.localStorage.getItem('authdataUser');
			
			$log.log($scope.noviTask);
			$http.post('http://localhost:8088/task/addTask', $scope.noviTask).then(function(response){
				$log.log(response);
			});
		}

		else $log.log('nesto');
	}

});