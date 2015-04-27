'use strict';

angular.module('angularApp')
  .controller('CardCtrl', function ($scope, $modalInstance, Category, cat, CardStatus, card, Card) {
    
      $scope.card = {};
      $scope.statuses = [];
      $scope.activity = {};

      $scope.create = function(){
        Category.cards.create({id: cat.id}, $scope.card,
          function success(){
            $modalInstance.close();
          }, 

          function errorCreateProject(err){
            console.log(err);
          })
      };


        CardStatus.find(function success(statuses){
            $scope.statuses = statuses;
          }, 

          function errorCreateProject(err){
            console.log(err);
          })


        if (card && card.id){
          Card.findOne({
            filter: {
              where: {id: card.id},
              include : ["status", {"activities": "account"}]
            }
          }, function(card){
             $scope.card = card;
          });
        }


        $scope.addActivity = function(){
          $scope.activity.account = $scope.logged;
          Card.activities.create({
            id: card.id
          }, $scope.activity, function(activity){
             $scope.getActivities();
             $scope.activity = {};
          });
        }


        $scope.getActivities = function(){
          Card.activities({
            id: card.id,
            filter : {
               include : "account"
            }
          }, function(data){
            $scope.card.activities = data;
          } );
        }
      

  });