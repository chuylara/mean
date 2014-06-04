angular.module('app').controller('mainController', function($scope) {
    $scope.courses = [
        { name: 'C# for sociopaths', featured: false, published: new Date("October 1, 1990")},
        { name: 'The MEAN stack', featured: true, published: new Date("January 2, 2013")},
        { name: 'Bulletproof coffee your code', featured: true, published: new Date("June 3, 2010")},
        { name: '4 minute JavaScript', featured: true, published: new Date("April 4, 2014")}
    ];
});