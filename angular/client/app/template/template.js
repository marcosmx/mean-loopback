'use strict';

angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('template', {
      	url : '/',
        templateUrl: 'app/template/views/container.html',
        controller: 'TemplateCtrl'
      });
  });