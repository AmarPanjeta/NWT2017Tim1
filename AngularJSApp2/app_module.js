var app=angular.module('OnlineKonzola',['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl:"../AngularJSApp2/partials/home.html",
		controller:'homeController'
	}).when("/tutorials", {
		templateUrl:"../AngularJSApp2/partials/tutorials.html",
		controller:'tutorialsController'
	}).when("/login", {
		templateUrl:"../AngularJSApp2/partials/login.html",
		controller:"loginController"
	}).when("/registration", {
		templateUrl:"../AngularJSApp2/partials/registration.html",
		controller:'registrationController'
	}).when("/pwchange", {
		templateUrl:"../AngularJSApp2/partials/pwchange.html",
		controller:'pwchangeController'
	}).when("/discussions", {
		templateUrl:"../AngularJSApp2/partials/discussions.html",
	}).when("/tasks", {
		templateUrl:"../AngularJSApp2/partials/tasks.html",
		controller:'tasksController'
	}).when("/detailedTask", {
		templateUrl:"../AngularJSApp2/partials/detailedTask.html",
		controller:"tasksController"
	}).when("/addTask",{
		templateUrl:"../AngularJSApp2/partials/addTask.html",
		controller:'tasksController'
	}).when("/editTask", {
		templateUrl:"../AngularJSApp2/partials/editTask.html",
		controller:'tasksController'
	}).when("/solveTask",{
		templateUrl:"../AngularJSApp2/partials/solveTask.html",
		controller:'tasksController'
	}).when("/showTutorial/:id",{
        templateUrl:"../AngularJSApp2/partials/showTutorial.html",
        controller:'showTutorialController'
    }).when("/addTutorial",{
        templateUrl:"../AngularJSApp2/partials/addTutorial.html",
        controller:'addTutorialController'
    }).when("/editTutorial/:id",{
        templateUrl:"../AngularJSApp2/partials/editTutorial.html",
        controller:'editTutorialController'
    });
});


