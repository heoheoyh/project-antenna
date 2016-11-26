'use strict';


class MypjlistController {

  constructor(Project,$scope, $http) {
    this.Project = Project;
    this.$scope = $scope;
    this.$http = $http;
    
   this.Project.mine().$promise
      .then((res) => {
   //    this.mypjlist = res;
    $scope.mypjlist = res;
      });

  $http.get('/api/projects/get-mytags')
    .then((res) => {
       $scope.mytags = res.data;
     console.log($scope.mytags); 
      const query = $scope.mytags;
       $http.get('/api/projects/get-projects', { params: {q: query}})  
        .then((res) => {
          $scope.getprojects= res.data;
          console.log($scope.getprojects);
        });
       
    }); 
    
  }

}
angular.module('projectHeoApp')
.controller('MypjlistController', MypjlistController);

