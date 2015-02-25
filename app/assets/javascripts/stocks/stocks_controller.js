angular.module('StockApp.controllers', [])
.controller('stockAppCtrl', function($scope, $http, stockAPIservice) {
  $scope.stockList = [];
  stockAPIservice.getStocks().success(function (data) {
    $scope.StockList = data;
    $scope.set_sizey();
  })
  $scope.set_sizey = function() {
    var count = $scope.StockList.length
    if (count < 1) {
      $('#stocky').parent().attr("data-sizey","2");
    } else if (count < 6 ) {
      $('#stocky').parent().attr("data-sizey","3");
    } else {
      $('#stocky').parent().attr("data-sizey","4");
    }
  }
  $scope.add = function() {
    $http( {method: 'post', url: "dashboard/stocks/add" , headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}, data: {symbol: $scope.text}})
    .success( function(data) {
      stockAPIservice.getStocks().success(function (data) {
        $scope.StockList = data;
        $scope.set_sizey();
      })
    })
    .error( function(data, status, headers, config) {
      console.log('Fail');
    });
  }
  $scope.remove = function() {
    $http( {method: 'delete', url: "dashboard/stocks/delete" , headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}, params: {symbol: $scope.text}})
    .success( function(data) {
      stockAPIservice.getStocks().success(function (data) {
        $scope.StockList = data;
        $scope.set_sizey();
      })
    })
    .error( function(data, status, headers, config) {
      console.log('Fail');
    });
  }
});
