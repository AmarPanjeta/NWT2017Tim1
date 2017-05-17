app.factory('UserService', function($http,$log){
	var service = {};
 
      	service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.Login=Login;


        return service;

        function GetAll() {
            return $http.get('http://localhost:8080/users-client/users').then(handleSuccess, handleError('Error getting all users'));
        }
 
        function GetById(id) {
            return $http.get('http://localhost:8080/users-client/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
 
        function GetByUsername(username) {
            return $http.get("http://localhost:8080/users-client/users/search/findUserByUsername?username="+username).then(handleSuccessUsera, handleError('Error getting user by username'));
        }
 
        function Create(user) {
            return $http.post("http://localhost:8080/users-client/user/register",user).then(handleSuccess, handleError('Error creating user'));
        }
 
        function Update(user) {
            return $http.put('http://localhost:8080/users-client/users/'+ user.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete('http://localhost:8080/users-client/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function Login(un, pw) {
            return $http.post('http://localhost:8080/users-client/user/login', {username:un, password:pw}).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions
 
        function handleSuccess() {
            return {success:true};
        }

        function handleSuccessUsera(response) {
            return response.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
});


