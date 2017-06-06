app.service('TaskService', function($http){
	var service={};
	service.GetAll=GetAll;
    service.GetTasksUser=GetTasksUser;
    service.DeleteTask=DeleteTask;
	return service;


	function GetAll(){
		return $http.get('http://localhost:8088/task/all').then(handleSuccess, handleError('Nije uspjelo ucitavanje zadataka'));
	}

    function GetTasksUser(taskid){
        return $http.get('http://localhost:8088/task/'+taskid+"/getuser").then(handleSuccess, handleError('Nije uspjelo ucitavanje usera za task sa id '+taskid));
    }

    function DeleteTask(taskid){
        return $http.get('http://localhost:8088/task/'+taskid+"/delete").then(handleSuccess, handleError('Brisanje taska nije uspjelo.'));
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