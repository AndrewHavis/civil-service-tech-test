module.exports = function(grunt) {
  var allSassFiles = [];

  var path = require('path');

  grunt.file.recurse(
    "./stylesheets/",
    function(abspath, rootdir, subdir, filename) {
      if(typeof subdir !== 'undefined'){
        var relpath = subdir + '/' + filename;
      } else {
        var relpath = filename;
      }
      if (filename.match(/\.scss/)) {
        allSassFiles.push("@import '" + relpath + "';");
      }
    }
  );

  grunt.file.write(
    "./spec/stylesheets/test.scss",
    allSassFiles.join("\n")
  );

  grunt.initConfig({
    clean: {
      sass: ["spec/stylesheets/test*css"]
    },
    jasmine: {
      javascripts: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'javascripts/govuk/analytics/google-analytics-universal-tracker.js',
          'javascripts/govuk/analytics/analytics.js',
          'javascripts/**/*.js'
        ],
        options: {
          specs: 'spec/unit/**/*.spec.js',
          helpers: 'spec/unit/*.helper.js'
        }
      }
    },
    sass: {
      development: {
        files: {
          './spec/stylesheets/test-out.css': './spec/stylesheets/test.scss'
        }
      },
      build: {
         files: {
           './public/styles/styles.css': './app/styles/main.scss'
         }
      },
      options: {
        loadPath: [
            './stylesheets'
        ],
        style: 'nested',
      }
    },
    pug: {
        build: {
          options: {
            pretty: true    
          },
          files: {
            'public/index.html': ['app/index.pug']
          }
        }
    },
    babel: { // Compile to ES5 as some browsers don't seem to support ES6/ES2015 directly yet
        options: {
            sourceMap: true,
            presets: ['es2015'],
            minified: true,
            comments: false
        },
        build: {
            files: {
                'public/scripts/candidates.js': 'app/scripts/candidates.js'
            }
        }
    },
    copy: {
        build: {
            expand: true,
            src: 'app/scripts/*',
            dest: 'public/scripts/',
            flatten: true
        }
    },
    shell: {
      multiple: {
        command: [
          'bundle',
          'bundle exec govuk-lint-sass stylesheets'
        ].join('&&')
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['sass:development', 'jasmine', 'shell']);
  grunt.registerTask('build', ['sass:build', 'babel:build', 'pug:build']);
  grunt.registerTask('default', ['test']);
};
