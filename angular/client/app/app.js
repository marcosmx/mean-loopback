'use strict';

angular.module('angularApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'lbServices',
  'ui.select'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider,  LoopBackResourceProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
}).run(function($rootScope, Account, $location){
    /**
    * Verify if user is logged
    **/
    $rootScope.moment = moment;
    $rootScope.$on("$stateChangeStart", function(){

      if(Account.isAuthenticated()){
        Account.getCurrent(function getAccount(account){
            $rootScope.logged = account;            
          });
        } else {
            if ($location.path() == "/signin" && $location.path() == "/signup" && $location.path() == "/signout" ){
              $location.path('/signin');
            }
        }
    });
    
});