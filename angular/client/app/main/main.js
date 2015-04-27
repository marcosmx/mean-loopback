'use strict';

angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/views/main.html',
        controller: 'MainCtrl'
      });
  });