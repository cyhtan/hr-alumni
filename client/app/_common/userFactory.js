angular.module('userFactory', ['ui.router', 'chat.factory'])

.factory('User', function($http, $state, ChatFactory) {

  var details = { 
    name: window.localStorage.getItem('hr-alum.user.name') || 'Anonymous',
    loggedIn: false
  };

  var apiUrl = 'http://localhost:3000';

  var loggedIn = function() {
    return details.loggedIn;
  };

  var login = function(userID) {
    return $http.post(apiUrl + '/api/users/login', {_id: userID})
                .then(function(response){
                  if (response.data._id !== undefined) {
                    details.loggedIn = true;
                    details.name = response.data.name;
                    window.localStorage.setItem('hr-alum.user.id', response.data._id);
                    window.localStorage.setItem('hr-alum.user.name', response.data.name);
                    ChatFactory.openConnection();
                  }
                });
  };

  var logout = function() {
    details.loggedIn = false;
    window.localStorage.removeItem('hr-alum.user.id');
    window.localStorage.removeItem('hr-alum.user.name');
    ChatFactory.closeConnection();
    $state.go('app.login');
  };

  return {
    loggedIn: loggedIn,
    details: details,
    login: login,
    logout: logout
  };

});