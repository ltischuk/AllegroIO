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
                templateUrl: '/views/main.html',
                controller: 'MainCtrl'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: '/views/project.html',
                controller: 'ProjectsCtrl'
            })
            .state('ngcropdemo', {
                url: '/ngcropdemo',
                templateUrl: '/views/ngcropdemo.html',
                controller: 'NgCropDemoCtrl'
            });

        $urlRouterProvider.otherwise('/home');

        $locationProvider.html5Mode(true);
    });