var app=angular.module('OnlineKonzola',['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl:"../AngularJSApp/partials/pocetna.html",
	}).when("/tutorials", {
		templateUrl:"../AngularJSApp/partials/tutorials.html",
	}).when("/login", {
		templateUrl:"../AngularJSApp/partials/login.html",
	}).when("/registration", {
		templateUrl:"../AngularJSApp/partials/registration.html",
	}).when("/profile", {
		templateUrl:"../AngularJSApp/partials/profile.html",
	});
});