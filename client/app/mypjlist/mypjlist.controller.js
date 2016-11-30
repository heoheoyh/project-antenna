'use strict';


class MypjlistController {

  constructor(Project,User,$scope, $http) {
    this.Project = Project;
    this.User = User;
    this.$scope = $scope;
    this.$http = $http;
    
    this.User.get().$promise
      .then((res) => {
        $scope.me = res;
      });


   this.Project.mine().$promise
      .then((res) => {
    $scope.mypjlist = res;
      });

  $http.get('/api/projects/get-mytags')
    .then((res) => {
       $scope.mytags = res.data;
      const query = $scope.mytags;
       $http.get('/api/projects/get-projects', { params: {q: query}})  
        .then((res) => {
          $scope.getprojects= res.data;
        });
       
    }); 
    
  }

}
angular.module('projectHeoApp')
.controller('MypjlistController', MypjlistController);

