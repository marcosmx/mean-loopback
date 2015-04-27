'use strict';

angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/sign/views/signin.html',
        controller: 'SignCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/sign/views/signup.html',
        controller: 'SignCtrl'
      })
      .state('signout', {
          controller: function signOut($state, Account){
            Account.logout(function(){
              $state.go('signin');
            });
          }
      });
  });