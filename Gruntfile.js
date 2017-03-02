module.exports = function (grunt)
{

  var jsFiles = [
    './node_modules/prismjs/components/prism-core.js',
    './node_modules/prismjs/components/prism-markup.js',
    './node_modules/prismjs/components/prism-css.js',
    './node_modules/prismjs/components/prism-clike.js',
    './node_modules/prismjs/components/prism-javascript.js',
    './node_modules/prismjs/components/prism-php.js',
    './node_modules/prismjs/plugins/unescaped-markup/prism-unescaped-markup.js',
    './node_modules/jquery/dist/jquery.min.js',
    './src/js/**/*.js'
  ];

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          paths: ['./node_modules', './src/less']
        },
        files: {
          'dist/assets/css/style.css': 'src/less/main.less'
        }
      },
    },
    cssmin: {
      target: {
        files: [
          {
            src: [
              './node_modules/prismjs/themes/prism-tomorrow.css',
              './node_modules/prismjs/plugins/unescaped-markup/prism-unescaped-markup.css',
            ],
            dest: './dist/assets/css/prism.min.css'
          },
          {
            expand: true,
            cwd: './dist/assets/css',
            src: ['*.css', '!*.min.css'],
            dest: './dist/assets/css',
            ext: '.min.css'
          }
        ]
      }
    },
    concat: {
      options: {
      },
      dist: {
        src: jsFiles,
        dest: './dist/assets/scripts.js'
      }
    },
    includereplace: {
      main: {
        options: {
          includesDir: './src/html/'
        },
        src: 'index.html',
        dest: './dist/'
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: './src',
            src: ['./assets/**'],
            dest: './dist/'
          },
          {
            expand: true,
            cwd: './src/vendor/fontawesome',
            src: ['./fonts/**'],
            dest: './dist/assets'
          }
        ]
      }
    },
    watch: {
      scripts: {
        files: ['./src/**/*.js'],
        tasks: ['js'],
        options: {
          spawn: false,
        }
      },
      static: {
        files: ['index.html', './src/assets/*', './src/html/**'],
        tasks: ['static'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: ['./src/**/*.less'],
        tasks: ['css'],
        options: {
          spawn: false,
        },
      },
    },
  };

  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.registerTask('css', ['less', 'cssmin']);
  grunt.registerTask('js', ['concat']);
  grunt.registerTask('static', ['copy', 'includereplace']);
  grunt.registerTask('default', ['css', 'js', 'static']);

};