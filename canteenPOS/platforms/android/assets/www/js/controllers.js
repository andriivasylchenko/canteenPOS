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

  $scope.initStore = function() {
    var collections = {
      orders : {
        searchFields : {id: 'string'},
        adapter : {
          name: 'canteenAdapter',
          add: 'addOrder',
            load: {
            procedure: 'getOrders',
                params: [],
                key: 'rows'
            }
        }
      }
    }

    var options = {};

    WL.JSONStore.init(collections, options).then(function () {
      // handle success
      console.log('Collection init success');
      var collectionName = 'orders';

      WL.JSONStore.get(collectionName).load().then(function (loadedDocuments) {
        // handle success
        console.log('Collection load success');
      }).fail(function (error) {
        // handle failure
        console.log('Collection load fail');
      });

    }).fail(function (error) {
      // handle failure
      console.log('Collection init fail');
    });

  };

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
      $scope.initStore();
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
    $scope.totalSum = $scope.getSum();

    $scope.currentDate = new Date();
    $scope.orderNumber = $scope.currentDate.getTime();

    var collectionName = 'orders';
    var options = {};

    var data = {order: $scope.orderNumber, cost: $scope.totalSum, items: $scope.order};

    WL.JSONStore.get(collectionName).add(data, options).then(function () {
     // handle success
     console.log('order added to collection');

     var collectionName = 'orders';

      WL.JSONStore.get(collectionName).push().then(function (response) {
        console.log('order pushed to adapter');
        alert('Order total: $' + $scope.totalSum);
        $scope.clearOrder();
        $scope.$apply();
      }).fail(function (error) {
        console.log('order failed to push to adapter');
      });
    }).fail(function (error) {
     // handle failure
     console.log('order failed to add to collection');
    });
  };

  $scope.logout = function() {
    alert('No functionality yet');
  };


})
