app.controller('tasksController', function($log, $http, $rootScope, $scope, $location, $window, AuthenticationService, TaskService, FlashService){
	$log.log('tasks controller ucitan');
	$scope.selIdx= -1;

	$scope.tasks=[];

	$scope.sortiranje='taskTitle';
	$scope.obrnuto=false;

	$scope.prikaziRjesenja=false;
	$scope.dodavanjeTestova=false;

	TaskService.GetAll().then(function(response){

		if(response.success)
		{
			$scope.tasks=response.res;
			$log.log($scope.tasks);
			$scope.daLiImaPrivilegije();
		}
		
		else{
			FlashService.Error(response.message);
		}
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

	$scope.daLiImaPrivilegije=function()
	{
		AuthenticationService.HasAdmin($window.localStorage.getItem('authdataUser')).then(function(response){
			if(response.response)
			{
				for(var i=0; i<$scope.tasks.length; i++)
				{
					$scope.tasks[i].task["imaPrivilegijeBrisanja"]=true;
				}
			}

			else{
				for(var i=0; i<$scope.tasks.length; i++)
				{
					if($scope.tasks[i].task.user.username==$window.localStorage.getItem('authdataUser'))
					{
						$scope.tasks[i].task["imaPrivilegijeBrisanja"]=true;
					}

					else $scope.tasks[i].task["imaPrivilegijeBrisanja"]=false;

				}
			}
		});
	}

	$scope.prikaziDetaljeTaska=function(task){
		if($scope.selectedTask!=null)
		{
			$rootScope.detaljnitask=task.task;
			$location.path('/detailedTask');
		}
	}

	$scope.prebaciDodajTask=function(){
		$scope.dodavanjeTestova=false;
		$location.path('/addTask');
	}

	$scope.dodajNoviTask=function(){
		$scope.dodavanjeTestova=false;
		var a=$rootScope.logovan();
		if(a)
		{
			$scope.noviTask.username=$window.localStorage.getItem('authdataUser');

			$log.log($scope.noviTask);

			/*$http.post('http://localhost:8088/task/addTask', $scope.noviTask).then(function(response){
				$scope.taskic=response.data;
				FlashService.Success("Task je uspjesno dodan");
			});*/

			TaskService.AddTask($scope.noviTask).then(function(response){
				if(response.success)
				{
					$scope.taskic=response.res;
					$scope.dodavanjeTestova=true;
					$scope.imaTestova=false;
					$scope.testovi=[];
				}

				else
				{
					FlashService.Error(response.message, false);
				}
			});
		}
	}

	$scope.dodajTest=function()
	{
		$scope.noviTest.taskid=$scope.taskic.id;
		$scope.testovi.push($scope.noviTest);
		//$scope.testovi.splice(1,0,$scope.noviTest);
		$scope.noviTest={};
		document.getElementById("unosTestovaForma").reset();
		$scope.imaTestova=true;
		$log.log($scope.testovi);
	}

	$scope.zavrsiDodavanjeTaska=function()
	{
		$http.post('http://localhost:8088/tests/addtests', {testovi:$scope.testovi}).then(function(response){
			$log.log(response);
		});

		$location.path('/tasks');
	}


	$scope.deleteTask=function(task, index)
	{
		TaskService.DeleteTask(task.task.id).then(function(response){
			if(response.success)
			{
				$scope.tasks.splice(index,1);
			}

			else
			{
				FlashService.Error(response.message, false);
			}
		});


		/*$http.get('http://localhost:8088/task/'+task.id+'/delete').then(function(response){
			$scope.tasks.splice(index,1);
		});*/
	}


	$scope.setOrder=function(koji)
	{
		if(koji==='najnoviji')
		{
			$scope.sortiranje='datumPostavljanja';
			$scope.obrnuto=false;
		}

		else if(koji==='najstariji')
		{
			$scope.sortiranje='datumPostavljanja';
			$scope.obrnuto=true;
		}

		else if(koji==='najpopularniji')
		{
			$scope.sortiranje='brojRjesenja';
			$scope.obrnuto=true;
		}

		else if(koji==='najnepopularniji')
		{
			$scope.sortiranje='brojRjesenja';
			$scope.obrnuto=false;
		}
	}

	$scope.prikaziIzmjenuTaska=function(task)
	{
		$rootScope.edittask=task;
		$location.path('/editTask');
	}

	$scope.editujTask=function()
	{
		TaskService.UpdateTask($rootScope.edittask.task).then(function(response){
			if(response.success)
			{
				$location.path('/tasks');
			}

			else
			{
				FlashService.Error(response.message);
			}
		});
	}

	$scope.prikaziRjesenjaFun=function()
	{
		$scope.solutions=[];

		$http.get('http://localhost:8088/task/'+$rootScope.detaljnitask.id+'/tenBestSolutions').success(function(response){
			$scope.solutions=response;
		}).error(function(response){
			FlashService.Error('Nemoguce loadati rjesenja za taj task', false);
		});

		$scope.prikaziRjesenja=true;
	}

	$scope.rijesiZadatak=function()
	{
		$scope.novisolution.username=$window.localStorage.getItem("authdataUser");
		$log.log($scope.novisolution);
		
		$http.post('http://localhost:8088/task/'+$rootScope.detaljnitask.id+"/addSolution",$scope.novisolution).then(function(){
			$log.log("jeee");
			$location.path('tasks');
		});
	}

});