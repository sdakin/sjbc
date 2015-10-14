module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    jshint: {
      all: ['site-files/static/js/**/*.js']
    }
  });

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};
