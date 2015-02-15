
/**
 * @ngdoc function
 * @name allegroIoApp.service:ProjectListSvc
 * @description
 * Service of the allegroIoApp
 */
'use strict';
angular.module('allegroIoApp')
    .service('ProjectListService', function ProjectList(Project) {

        this.projectList = [new Project('ngcropdemo')];

    }
);
