'use strict';

angular.module('angularApp')
  .controller('ProjectDetailCtrl', function ($scope, Account, $stateParams, Project, $modal, $log) {
    
  		//get list projects
  		$scope.project = {};
      $scope.category = {};
      $scope.categories = [];

      $scope.getProject = function(){
        Account.projects(
            {
              id: $scope.logged.id,
              filter : {
                where: {
                    id: $stateParams.id
                }
              }
            },
            function success(project){
              $scope.project = project[0];
            },
            function error(err){

            }
          );
      }

      $scope.addCard = function(category){
        var modalInstance = $modal.open({
            templateUrl: 'app/project/views/card.modal.html',
            controller: 'CardCtrl',
            //size: size,
            resolve: {
                cat: function () {
                  return category;
                }, 
                card : function(){
                  return null;
                }
              }
            });

          modalInstance.result.then($scope.getCategories, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
      }

      $scope.openCard = function(card){
        var modalInstance = $modal.open({
            templateUrl: 'app/project/views/card.modal.html',
            controller: 'CardCtrl',
            //size: size,
            resolve: {
              cat: function () {
                return null;
              },
              card : function(){
                 return card;
              }
            }
            });

          modalInstance.result.then($scope.getCategories, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
      }

      $scope.addCategory = function(){
        Project.categories.create({id: $stateParams.id}, $scope.category,
          function(category){
              $scope.category = {};
              $scope.getCategories();
          });
      }

      $scope.getCategories = function(){
        Project.categories(
          {
            id: $stateParams.id, 
            filter: { 
              include:{"cards": 'status'}
            }
          },
          function(categories){
             $scope.categories = categories;
          });
      }

      $scope.$watch('logged', function(logged){
        if (typeof logged == "undefined") return false;
        $scope.getProject();
        $scope.getCategories();
      });

  		
});