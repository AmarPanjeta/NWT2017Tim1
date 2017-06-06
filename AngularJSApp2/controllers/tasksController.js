app.controller('tasksController', function($log, $http, $rootScope, $scope, $location, $window, AuthenticationService, TaskService, FlashService){
	$log.log('tasks controller ucitan');
	$scope.selIdx= -1;

	$scope.odabraniTask={};

	$scope.tasks=[];

	TaskService.GetAll().then(function(response){

		if(response.success)
		{
			$scope.tasks=response.res;
			$scope.daLiImaPrivilegije();	
		}
		
		else{
			FlashService.Error(response.message);
		}
	});

	$scope.daLiImaPrivilegije=function()
	{
		AuthenticationService.HasAdmin($window.localStorage.getItem('authdataUser')).then(function(response){
			if(response.response)
			{
				for(var i=0; i<$scope.tasks.length; i++)
				{
					$scope.tasks[i]["imaPrivilegijeBrisanja"]=true;
				}
			}

			else{
				for(var i=0; i<$scope.tasks.length; i++)
				{
					if($scope.tasks[i].user.username==$window.localStorage.getItem('authdataUser'))
					{
						$scope.tasks[i]["imaPrivilegijeBrisanja"]=true;
					}

					else $scope.tasks[i]["imaPrivilegijeBrisanja"]=false;
				}
			}
		});


		$log.log($scope.tasks);
	}

	$scope.selectTask=function(task,idx){
		if($scope.selectedTask!=null){
			$scope.selectedTask=null;
			$rootScope.odabraniTask=null;
		}

		else{
			$scope.selectedTask=task;
			$scope.selIdx=idx;
			$rootScope.odabraniTask=task;
		}	
	}

	$scope.isSelTask=function(task){
		return $scope.selectedTask===task;
	}







//moje funkcije 
$scope.prikaziDetaljeTaska=function(){
	if($scope.selectedTask!=null)
	{
		$location.path('/detailedTask');
	}
}

$scope.prebaciDodajTask=function(){
	$location.path('/addTask');
}

$scope.dodajNoviTask=function(){
	var a=$rootScope.logovan();
	if(a)
	{
		$scope.noviTask.username=$window.localStorage.getItem('authdataUser');

		$log.log($scope.noviTask);
		$http.post('http://localhost:8088/task/addTask', $scope.noviTask).then(function(response){
			$location.path('/tasks');
		});
	}

	else $log.log('nesto');
}

$scope.deleteTask=function(task, index)
{
	/*TaskService.DeleteTask(task.id).then(function(response){
		if(response.success)
		{
			FlashService.Success('Task je uspjesno obrisan.', true);
		}

		else
		{
			FlashService.Error(response.message, false);
		}
	});*/


	$http.get('http://localhost:8088/task/'+task.id+'/delete').then(function(response){
		$scope.tasks.splice(index,1);
	});
}

});