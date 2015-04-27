'use strict';

angular.module('angularApp')
  .controller('SignCtrl', function ($scope, Account, $state) {
    

  	 $scope.account = {};

  	 $scope.signIn =  function(){
  	 	Account.login($scope.account, function success(data){
  	 		$state.go('template.projects');
  	 	}, function error(){
  	 		console.log("error signIn");
  	 	});
  	 }


  	 $scope.signUp =  function(){
    	 	Account.create($scope.account, $scope.signIn, function(err){
          console.log(err);
        });
  	 }


  });
