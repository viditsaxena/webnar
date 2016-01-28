  console.log('app.js is loaded');


var webinarApp = angular.module('webinarApp', ['ngCookies', 'ngRoute']);

webinarApp.config(function($routeProvider){

    $routeProvider

    .when('/', {
      templateUrl: './home.html',
      controller: 'mainController'
    })
    .when('/signup', {
      templateUrl: './signup.html',
      controller: 'mainController'
    })
    .when('/login', {
      templateUrl: './login.html',
      controller: 'mainController'
    })
    .when('/create', {
      templateUrl: './create.html',
      controller: 'mainController'
    })
});

webinarApp.controller('mainController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location){

  $scope.welcomeMessage = '';
  $scope.users = [];
  $scope.searchQuery = "";
  $scope.orderByField = 'name';
  $scope.newUser = {};
  $scope.logInUser = {};
  $scope.webinars = [];
  $scope.newWebinar = {};
  $scope.isDisabled = false;
  $scope.token;


  // ============== Users ================

  $scope.getUsers = function(){
    $http.get('/api/users').then(function(response){
      $scope.users = response.data;
    });
  };
  $scope.getUsers();

  $scope.createUser = function(){
    $http.post('/api/users', $scope.newUser).then(function(response){
      console.log(response.data)
      $scope.users.push(response.data);
      $scope.newUser = {};
      $location.path('/login');
    });
  };

  $scope.obtainToken = function(){
    $http.post("/api/users/authentication_token", $scope.logInUser).then(function(reponse){
      $scope.token = reponse.data.token;
      console.log($scope.token);
      $cookies.put('token', $scope.token);
      $location.path('/')
    });
  };

  $scope.logOut = function(){
    $cookies.remove('token');
    $scope.token = $cookies.get('token');
    $scope.logInUser = {};
  };

  $scope.token = $cookies.get('token');


// angular.module('Webinar').controller('WebinarsController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
//   $scope.token = $cookies.get('token');

  $scope.getWebinars = function(){
    $http.get('/api/webinars').then(function(response){
      $scope.webinars = response.data;
      });
  };
  $scope.getWebinars();


  $scope.addWebinar = function(){
    $http({
      url: '/api/webinars',
      method: 'post',
      data: $scope.newWebinar
    }).then(function(response){
      $scope.getWebinars();
      $scope.newWebinar = {};
    });
  };

  // $scope.addItem = function(){
  //   $scope.newWebinar.items.push({});
  // };

  $scope.removeWebinar = function(webinar){
        var url = '/api/webinars/' + webinar._id;
        $http.delete(url).then(function(){
        $scope.getWebinars();
        });
    };

  $scope.updateWebinar = function(webinar){
      // var webinar = $scope.webinars[$index];
      var url = '/api/webinars/' + webinar._id;
      $http.patch(url, webinar).then(function(response){
        console.log(response.data);
          webinar = response.data;
      });
  };


  $scope.disableButton = function(webinar, item) {
           $scope.isDisabled = true;
           item.votes = parseInt(item.votes) + 1;
           $scope.updateWebinar(webinar);
       };

}]);
