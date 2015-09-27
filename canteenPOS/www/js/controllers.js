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

  $scope.itemsCnt = 1;
  $scope.order = [];

  $scope.addItem = function(item) {
    var foodItem = {
      id : $scope.itemsCnt,
      item: item
    };
    $scope.order.push(foodItem);
    $scope.itemCnt = $scope.order.length;
  };

  $scope.getSum = function() {
    var i = 0;
    sum = 0;

    for (; i < $scope.order.length; i++) {
      sum += parseInt($scope.order[i].item.price, 10);
    };

    return sum;
  };

  $scope.deleteItem = function(index) {
    $scope.order.splice(index, 1);
  };

  $scope.clearOrder = function() {
    $scope.order = [];
  };

  $scope.checkoutOrder = function() {
    alert('Order total: $' + $scope.getSum());
  };


})
