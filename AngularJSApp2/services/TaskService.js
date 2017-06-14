app.service('TaskService', function($http){
	var service={};
	service.GetAll=GetAll;
    service.GetTasksUser=GetTasksUser;
    service.DeleteTask=DeleteTask;
    service.UpdateTask=UpdateTask;
    service.AddTask=AddTask;
    service.GetSolvedTasks=GetSolvedTasks;
    service.GetUnsolvedTasks=GetUnsolvedTasks;
    service.GetTaskSolutionsByUser=GetTaskSolutionsByUser;
	return service;


	function GetAll(){
		return $http.get('http://localhost:8088/task/all').then(handleSuccess, handleError('Nije uspjelo ucitavanje zadataka'));
	}

    function GetTasksUser(taskid){
        return $http.get('http://localhost:8088/task/'+taskid+"/getuser").then(handleSuccess, handleError('Nije uspjelo ucitavanje usera za task sa id '+taskid));
    }

    function AddTask(task){
        return $http.post('http://localhost:8088/task/addTask',task).then(handleSuccess, handleError('Task se ne moze dodati u bazu'));
    }

    function DeleteTask(taskid){
        return $http.get('http://localhost:8088/task/'+taskid+"/delete").then(handleSuccess, handleError('Brisanje taska nije uspjelo.'));
    }

    function UpdateTask(task){
        return $http.put('http://localhost:8088/tasks/'+task.id, task).then(handleSuccess, handleError('Nije moguce napraviti izmjene za taj task.'));
    }

    function GetSolvedTasks(username){
        return $http.get('http://localhost:8088/user/'+username+'/solvedTasks').then(handleSuccess, handleError("Nema rijesenih zadataka"));
    }

    function GetUnsolvedTasks(username){
        return $http.get('http://localhost:8088/user/'+username+'/unsolvedTasks').then(handleSuccess, handleError("Nema nerijesenih zadataka"));
    }

    function GetTaskSolutionsByUser(taskid, username){
        return $http.get('http://localhost:8088/task/'+taskid+'/getsolutionsbyuserandtask/'+username).then(handleSuccess,handleError("Nije ok"));
    }


///////////////////////////////////

    function handleSuccess(response) {
            return {success:true, res:response.data};
        } 

    function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
    }
});