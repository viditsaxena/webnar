  console.log('app.js is loaded');


angular.module('Webinar', ['ngCookies']);

angular.module('Webinar').controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.welcomeMessage = 'Hello from Angular';
  $scope.users = [];
  $scope.searchQuery = "";
  $scope.orderByField = 'name';
  $scope.newUser = {};
  $scope.logInUser = {};
  $scope.webinars = [];
  $scope.newWebinar = {};
  $scope.isDisabled = false;


  // ============== Users ================

  $scope.getUsers = function(){
    $http.get('/api/users').then(function(response){
      $scope.users = response.data;
    });
  };
  $scope.getUsers();

  $scope.createUser = function(){
    $http.post('/api/users', $scope.newUser).then(function(response){
      $scope.users.push(response.data);
      $scope.newUser = {};
    });
  };

  $scope.obtainToken = function(){
    $http.post("/api/users/authentication_token", $scope.logInUser).then(function(reponse){
      $scope.token = reponse.data.token;
      $cookies.put('token', $scope.token);

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
