module.exports = function(grunt) {
  grunt.initConfig({
    loopback_sdk_angular: {
      services: {
        options: {
          input: 'server/server.js',
          output: 'js/lb-services.js'
        }
      }
    },
    docular: {
      groups: [
        {
          groupTitle: 'Mean',
          groupId: 'mean',
          sections: [
            {
              id: 'Mean',
              title: 'API v0.1',
              scripts: [ 'js/lb-services.js' ]
            }
          ]
        }
      ]
    }
  });
 
  // Load the plugin that provides the "loopback-sdk-angular" and "grunt-docular" tasks.
  grunt.loadNpmTasks('grunt-loopback-sdk-angular');
  grunt.loadNpmTasks('grunt-docular');
  // Default task(s).
  grunt.registerTask('default', ['loopback_sdk_angular', 'docular']);
};
