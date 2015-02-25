angular.module('FootballApp.controllers', [])
.controller('footballAppCtrl', function($scope, $http, footballAPIservice) {
  $scope.gameList = [];
  footballAPIservice.getGames().success(function (data) {
    $scope.GameList = data;
  })
});
