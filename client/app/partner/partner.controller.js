'use strict';

class PartnerController {

  partner = {};

  constructor(Partner,User, $scope) {
    this.Partner = Partner;
    this.User = User;
    this.$scope = $scope;

    this.User.get().$promise
      .then((res) => {
        $scope.my = res;
      });

    this.User.query().$promise
      .then((res) => {
        $scope.partner = res;
      });

  }


}

angular.module('projectHeoApp')
  .controller('PartnerController', PartnerController);

