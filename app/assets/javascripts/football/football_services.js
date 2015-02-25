angular.module('FootballApp.services', []).
factory('footballAPIservice', function($http) {
  var footballAPI = {};
  footballAPI.getGames = function() {
    return $http({
      method: 'get',
      url: '/dashboard/football/endpoint'
    });
  }
  return footballAPI;
});
