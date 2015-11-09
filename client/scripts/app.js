var myApp = angular.module('myApp', []);

myApp.controller('MessageController', ['$scope', '$http', function($scope, $http){
    $scope.message = {};
    $scope.messagesArray = [];

    //POST
    $scope.addMessage = function(response){
        $http.post('/data', response).then(function(response){
            console.log(response);
            //console.log($scope.message);
            $scope.getMessages();
        });
    };

    //GET
    $scope.getMessages = function(){
        $http.get('/data').then(function(response){
            $scope.messagesArray = response.data;
        });
    };

    $scope.deleteMessage = function(){
        $http.delete('data').then(function(){
            $scope.getMessages();
        });
    }

    //READ all messages
    $scope.getMessages();
}]);