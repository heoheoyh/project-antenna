'use strict';


class MypjlistController {

  constructor(Project,$scope) {
    this.Project = Project;
    this.$scope = $scope;
    
   this.Project.mine().$promise
      .then((res) => {
   //    this.mypjlist = res;
    $scope.mypjlist = res;
       console.log(res);
      });

  }

}
angular.module('projectHeoApp')
.controller('MypjlistController', MypjlistController);

