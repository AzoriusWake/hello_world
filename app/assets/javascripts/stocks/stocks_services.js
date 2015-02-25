angular.module('StockApp.services', []).
factory('stockAPIservice', function($http) {
  var stockAPI = {};
  stockAPI.getStocks = function() {
    return $http({
      method: 'get',
      url: '/dashboard/stocks/endpoint'
    });
  }
  return stockAPI;
});

