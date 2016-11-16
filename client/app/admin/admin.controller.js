'use strict';

(function() {

class AdminController {
  constructor(User,$scope) {
    // Use the User $resource to fetch all users
    this.users = User.query();
//   this.User.query().$promise
//      .then((res) => {
//        $scope.admin = res;
//      });

  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('projectHeoApp.admin')
  .controller('AdminController', AdminController);

})();
