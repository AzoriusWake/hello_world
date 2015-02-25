angular.module('BasketballApp.services', []).
factory('basketballAPIservice', function($http) {
  var basketballAPI = {};
  basketballAPI.getGames = function() {
    return $http({
      method: 'get',
      url: '/dashboard/basketball/endpoint'
    });
  }
  return basketballAPI;
});
