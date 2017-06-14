app.factory('CompilerService',function($http){
	var service={};
	service.RunCodeWithTests=RunCodeWithTests;
	return service;

	function RunCodeWithTests(kompajliraj){
		return $http.post('http://localhost:8099/compiler/runwitat',kompajliraj).then(handleSuccess, handleError("Kod se ne moze kompajlirati."));
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