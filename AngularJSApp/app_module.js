var app=angular.module('OnlineKonzola',['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl:"partials/pocetna.html",
		controller:'pocetnaController'
	}).when("/tutorials", {
		templateUrl:"partials/tutorials.html",
		controller:'tutorialsController'
	}).when("/login", {
		templateUrl:"partials/login.html",
		controller:'loginController'
	}).when("/registration", {
		templateUrl:"partials/registration.html",
		controller:'registrationController'
	}).when("/profile", {
		templateUrl:"partials/profile.html",
		controller:'profileController'
	});
});