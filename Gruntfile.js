'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['./lib/*.js', './lib/**/*.js', 'examples/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jsonlint: {
            sample: {
                src: ['./examples/app/*.json']
            }
        },
        jsbeautifier : {
            files : ['./lib/*.js', './lib/**/*.js', 'examples/*.js'],
            options : {}
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-dustjs');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadTasks('./node_modules/makara/tasks/');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks("grunt-dustjs");
    grunt.registerTask('default', ['jshint', 'jsonlint', 'jsbeautifier']);
};
