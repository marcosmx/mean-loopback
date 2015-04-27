'use strict';

angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('template.project', {
        url: 'projects',
        templateUrl: 'app/project/views/project.list.html',
        controller: 'ProjectListCtrl'
      })
      .state('template.projectDetail', {
        url: 'projects/:id',
        templateUrl: 'app/project/views/project.detail.html',
        controller: 'ProjectDetailCtrl'
      });
  });