/**
 * Created by ltischuk on 10/11/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.factory:Project
 * @description
 * Service of the allegroIoApp
 */
angular.module('allegroIoApp')
    .factory('Project', function ProjectFactory() {

        var Project = function(projectName, stateName){

            this.projectName = projectName;
            this.projectStateName = stateName;
        };

        //Prototype ensures that only one method for all instances is created
        Project.prototype.getProjectName = function(){
            return this.projectName;
        };

        Project.prototype.getProjectStateName = function(){
            return this.projectStateName;
        };

        return Project;
    }
);
