angular.module('starter.controllers', [])

.controller('POSController', function($scope, menu){

  console.log('POSController init');

  $scope.date = new Date();
  $scope.currentMenu = '';
  $scope.requestType = '';

  $scope.currentHour = $scope.date.getHours();

  if ($scope.currentHour <12) {
    $scope.currentMenu = 'Breakfast';
    $scope.requestType = 'breakfast';
  } else if ($scope.currentHour <16 && $scope.currentHour >11) {
    $scope.currentMenu = 'Lunch';
    $scope.requestType = 'lunch';
  } else if ($scope.currentHour <23 && $scope.currentHour >15) {
  $scope.currentMenu = 'Dinner';
  $scope.requestType = 'dinner';
  } else {
    console.log('Error with current hour');
  }

  document.addEventListener('initDone', loadMenu, false);

  function loadMenu(){
    var DataPromise = menu.request();
    DataPromise.then(function(result){
      if ($scope.requestType == 'breakfast') {
        $scope.food = result.breakfast;
      } else if ($scope.requestType == 'lunch') {
        $scope.food = result.lunch;
      } else if ($scope.requestType == 'dinner') {
        $scope.food = result.dinner;
      };
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

  $scope.logout = function() {
    alert('No functionality yet');
  };


})
