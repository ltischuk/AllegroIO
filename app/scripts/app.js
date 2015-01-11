'use strict';

/**
 * app specific modules
 */

 angular.module('ngcrop', []);
 /*
 * Main module of the application.
 */
angular
  .module('allegroIoApp',
    ['ui.router',
     'ngcrop']

    )
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/partials/app.html',
                controller: 'AppController'
            })
            .state('projects', {
                abstract: true,
                url: '/projects',
                template: '<ui-view></ui-view>'
            })
            .state('projects.selection',{
              url: '/selection',
              templateUrl: '/scripts/modules/projects/partials/selection.html',
              controller: 'ProjectsController'
            })
            .state('projects.ngcropdemo', {
                url: '/ngcropdemo',
                templateUrl: '/scripts/modules/projects/partials/ngcropdemo.html',
                controller: 'NgCropDemoController'
            });

        $urlRouterProvider.otherwise('/home');

        $locationProvider.html5Mode(true);
    });
