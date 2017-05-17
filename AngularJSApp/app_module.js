var app=angular.module('OnlineKonzola',['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl:"../AngularJSApp/partials/pocetna.html",
		controller:'pocetnaController'
	}).when("/tutorials", {
		templateUrl:"../AngularJSApp/partials/tutorials.html",
		controller:'tutorialsController'
	}).when("/login", {
		templateUrl:"../AngularJSApp/partials/login.html",
		controller:"loginController"
	}).when("/registration", {
		templateUrl:"../AngularJSApp/partials/registration.html",
		controller:'registrationController'
	}).when("/profile", {
		templateUrl:"../AngularJSApp/partials/profile.html",
	});
});


