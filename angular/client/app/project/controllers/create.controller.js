'use strict';

angular.module('angularApp')
  .controller('CreateProjectCtrl', function ($scope, Account, $modalInstance) {
    
  		$scope.project = {};

  		$scope.create = function(){
  			Account.projects.create({id: $scope.logged.id}, $scope.project,
  				function success(project){
  					$modalInstance.close(project);
  				}, 

  				function errorCreateProject(err){

  				})
  		};

  });