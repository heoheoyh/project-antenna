'use strict';

class PartnerController {

  partner = {};

  constructor(Partner,User, $scope, $http) {
    this.Partner = Partner;
    this.User = User;
    this.$scope = $scope;
    this.$http = $http;

    this.User.get().$promise
      .then((res) => {
        $scope.my = res;
      });

    this.User.query().$promise
      .then((res) => {
        $scope.partner = res;
      });
    $scope.locals = [
      '서울특별시',
      '경기도',
      '부산광역시',
      '대구광역시',
      '인천광역시',
      '광주광역시',
      '대전광역시',
      '울산광역시',
      '세종특별자치시',
      '강원도',
      '충청북도',
      '충청남도',
      '전라북도',
      '전라남도',
      '경상북도',
      '경상남도',
      '제주특별자치도'  
    ];


    $scope.changedValue= (item) => {
      const q = item;
      $http.get('/api/locals/state', {
        params: { q: item}
      }).success(function(data)
        {
          $scope.states = data;
          //const query = $scope.states;
        });
      
    }  

    $scope.changedState= (item) => {
      const query = item;
      $http.get('/api/users/get-local', {params: {q:query}})
      .then((res) => {
        $scope.partner = res.data;
      });
    }
  }


}

angular.module('projectHeoApp')
  .controller('PartnerController', PartnerController);

