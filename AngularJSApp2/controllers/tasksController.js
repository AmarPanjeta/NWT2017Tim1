app.controller('tasksController', function($log, $http, $rootScope, $scope, $location, $window, AuthenticationService, TaskService, FlashService, CompilerService){
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

	$scope.detaljnitaskodabran=function()
	{
		if($rootScope.detaljnitask!=null) return true;
		else 
		{
			$location.path('/tasks');	
			return false;
		}
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
			$rootScope.detaljnitask=task;

			$location.path('/detailedTask');
		}
	}

	$scope.prebaciDodajTask=function(){
		$scope.dodavanjeTestova=false;
		$location.path('/addTask');
	}

	$scope.prikaziMojaRjesenja=function()
	{
		TaskService.GetTaskSolutionsByUser($rootScope.detaljnitask.task.id, $window.localStorage.getItem("authdataUser")).then(function(response){
			if(response.success)
			{
				$scope.mojarjesenja=response.res;
				$scope.imaMojaRjesenja=!$scope.imaMojaRjesenja;
			}

			else
			{
				FlashService.Error(response.message, false);
			}
		});
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

	$scope.prikaziZadatke=function(koje)
	{
		if(koje==='sve')
		{
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
		}

		else if(koje==='uradjene')
		{
			TaskService.GetSolvedTasks($window.localStorage.getItem("authdataUser")).then(function(response){
				if(response.success)
				{
					$scope.tasks=response.res;
					$scope.daLiImaPrivilegije();
				}

				else{
					FlashService.Error(response.message);
				}
			});
		}

		else if(koje==='neuradjene')
		{
			TaskService.GetUnsolvedTasks($window.localStorage.getItem("authdataUser")).then(function(response){
				if(response.success)
				{
					$scope.tasks=response.res;
					$scope.daLiImaPrivilegije();
				}

				else{
					FlashService.Error(response.message);
				}
			});
		}
	}


	$scope.deleteTask=function(task)
	{
		TaskService.DeleteTask(task.task.id).then(function(response){
			if(response.success)
			{
				$scope.prikaziZadatke('sve');
			}

			else
			{
				FlashService.Error(response.message, false);
			}
		});
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

		$http.get('http://localhost:8088/task/'+$rootScope.detaljnitask.task.id+'/tenBestSolutions').success(function(response){
			$scope.solutions=response;
		}).error(function(response){
			FlashService.Error('Nemoguce loadati rjesenja za taj task', false);
		});

		$scope.prikaziRjesenja=!$scope.prikaziRjesenja;
	}

	$scope.rijesiZadatak=function()
	{
		$scope.novisolution.username=$window.localStorage.getItem("authdataUser");
		
		/*$http.post('http://localhost:8088/task/'+$rootScope.detaljnitask.task.id+"/addSolution",$scope.novisolution).then(function(){
			$scope.kompajliraj={};

			$scope.kompajliraj.code=$scope.novisolution.code;
			$scope.kompajliraj.username=$scope.novisolution.username;
			$scope.kompajliraj.tests=[];

			for(var i=0; i<$rootScope.detaljnitask.testovi.length; i++)
			{
				$scope.kompajliraj.tests.push($rootScope.detaljnitask.testovi[i].input);
				$scope.kompajliraj.tests.push($rootScope.detaljnitask.testovi[i].output);
			}

			$log.log($scope.kompajliraj);

			CompilerService.RunCodeWithTests($scope.kompajliraj).then(function(response){
				if(response.success)
				{
					$log.log(response);
				}

				else
				{
					FlashService.Error(response.message,false);
				}
				
			});

			$location.path('/tasks');
		});*/

		$scope.kompajliraj={};

		$scope.kompajliraj.code=$scope.novisolution.code;
		$scope.kompajliraj.username=$scope.novisolution.username;
		$scope.kompajliraj.tests=[];

		for(var i=0; i<$rootScope.detaljnitask.testovi.length; i++)
		{
			$scope.kompajliraj.tests.push($rootScope.detaljnitask.testovi[i].input);
			$scope.kompajliraj.tests.push($rootScope.detaljnitask.testovi[i].output);
		}

		$log.log($scope.kompajliraj);

		CompilerService.RunCodeWithTests($scope.kompajliraj).then(function(response){
			if(response.success)
			{
				$log.log(response);

				//pa ovdje sacuvati solution
				$scope.novisolution.passing=parseInt(response.res.result,10); /////vjerovatno ce mi ovo trebati?? kod amara je string
				$http.post('http://localhost:8088/task/'+$rootScope.detaljnitask.task.id+"/addNewSolution",$scope.novisolution).then(function(response){
					$log.log("jeeeee");
				});

				$location.path('/tasks');
			}

			else
			{
				FlashService.Error(response.message,false);
				$location.path('/tasks');
			}

		});

	}


});