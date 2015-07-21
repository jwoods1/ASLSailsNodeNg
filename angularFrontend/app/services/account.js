angular.module('app')
  .factory('Account', function($http) {
    var profile = {};
    return {
      getProfile: function() {
        profile = $http.get('/api/user/me');
        return profile;
      },
      updateProfile: function(profileData) {
        return $http.put('/api/user/me', profileData);
      },
       profile:profile
    };
  });