/**
 * Created by ltischuk on 10/11/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.factory:NavigationSrv
 * @description
 * # EnumsSvc
 * Service of the allegroIoApp
 */
angular.module('allegroIoApp')
    .factory('NavigationSrv', function () {
        var service = {};
        service.mainAppName = 'AllegroIO';
        service.menuItems = [{name: 'Home'}, {name: 'Projects'}, {name: 'Contact'}];

        return service;
    }
);
