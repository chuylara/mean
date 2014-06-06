angular.module('app').controller('navBarLoginCtrl', function($scope, $http, identityService, notificationService, authService, $location) {
   $scope.identityService = identityService;

   $scope.signin = function(username, password) {
       authService.authenticateUser(username, password).then(function(success) {
           if (success) {
               notificationService.notify("You have successfully signed in");
           } else {
               notificationService.notify("Username/password combination is incorrect");
           }
       });
   };

    $scope.signout = function() {
        authService.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";

            notificationService.notify("You've successfully signed out");

            $location.path('/');
        })
    }
});