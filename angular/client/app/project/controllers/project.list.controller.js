'use strict';

angular.module('angularApp')
  .controller('ProjectListCtrl', function ($scope, $modal, $log, Account) {
    
  		//get list projects
  		$scope.projects = [];

  		$scope.getProjects = function(){

  			Account.projects({
  				id:$scope.logged.id,
  				order: 'createdAt ASC'
  			}, function(projects){
  				$scope.projects = projects;
  			});
  		}

  		$scope.$watch('logged', function(logged){
  			if (typeof logged == "undefined") return false;
  			$scope.getProjects()
  		});

  		$scope.openCreateProject = function(){
  			var modalInstance = $modal.open({
			      templateUrl: 'app/project/views/create.modal.html',
			      controller: 'CreateProjectCtrl',
			      //size: size,
			      resolve: {
			        items: function () {
			          return $scope.items;
			        }
			      }
				    });

			    modalInstance.result.then($scope.getProjects, function () {
			      $log.info('Modal dismissed at: ' + new Date());
			    });
  		}
});
