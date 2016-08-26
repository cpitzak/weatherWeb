/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dependencies: {
        files: [
          {
            src:'node_modules/angular-chart.js/dist/angular-chart.min.js',
            dest: 'app/scripts/lib/angular-chart.min.js'
          },{
            src:'node_modules/angular-chart.js/node_modules/chart.js/dist/Chart.min.js',
            dest: 'app/scripts/lib/Chart.min.js'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('build', ['copy:dependencies']);

};