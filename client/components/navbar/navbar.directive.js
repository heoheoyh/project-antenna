'use strict';

angular.module('projectHeoApp')
  .directive('navbar', ($window) => ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav',
    link(scope, elem, attrs) {
      if (attrs.scrollNav !== undefined) {
        const windowEl = angular.element($window);
          const $nav = angular.element(elem).find('nav');
        $nav.removeClass('indigo');

        windowEl.on('scroll', (ev) => {
          const scrollTop = windowEl.scrollTop();
          
          if (scrollTop > $nav.height()) {
            $nav.addClass('nav-fadein');
          }
          else{
            $nav.removeClass('nav-fadein');
          }
        });
      }
    }
  }));
