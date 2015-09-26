angular.module('starter.controllers', [])

.controller('POSController', function($scope, menu){

  console.log('POSController init');

  document.addEventListener('initDone', loadMenu, false);

  function loadMenu(){
    var DataPromise = menu.request();
    DataPromise.then(function(result){
      $scope.food = result.breakfast;
      $scope.$apply();
    })
  };
})
