//expand：如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
//cwd：需要处理的文件（input）所在的目录。
//src：表示需要处理的文件。如果采用数组形式，数组的每一项就是一个文件名，可以使用通配符。
//dest：表示处理后的文件名或所在目录。
//ext：表示处理后的文件后缀名。

//*：匹配任意数量的字符，不包括/。
//?：匹配单个字符，不包括/。
//**：匹配任意数量的字符，包括/。
//{}：允许使用逗号分隔的列表，表示“or”（或）关系。
//!：用于模式的开头，表示只返回不匹配的情况。

module.exports = function(grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    /**
     *  自定义 requirejs build
     *  去除 define and require
     */
    grunt.loadTasks('requirejsbuild');

    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        config: appConfig,

//        bower: {
//            install: {
//                options: {
//                    targetDir: '<%= config.app %>/lib',
//                    install: true,
//                }
//            }
//        },

        //监控页面改变
        watch: {
            options: {
                livereload: true
            },

            bower: {
                files: ['bower.json']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:server']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,**/}*.html',
                    '<%= config.app %>/{,**/}*.js',
                    '<%= config.app %>/{,**/}*.css'
                ]
            },
            simple: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,**/}*.css'
                ]
            },
            html: {
                files: [
                    '<%= config.app %>/{,*/}*.html'
                ]
            }
        },

        connect: {
            options: {
                port: 9091,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'dev.tagace.com',
                livereload: 35731,
                base: 'app'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://dev.tagace.com/crm/index.html'
                    }
                }
            }
        },

        // build前清空文件夹
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= config.dist %>/*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // 代码风格检测
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/src/{,*/}*.js'
            ]
        },

        // 修改文件名
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/{,*/}*.js'
                    ]
                }
            }
        },

        requirejsbuild: {
            all: {
                dest: '<%= config.dist %>/mu.js'
            }
        },

        uglify: {
            options: {
                report: 'min',
                mangle: false
            },

            build: {
                src: '<%= config.dist %>/mu.js',
                dest: '<%= config.dist %>/mu.min.js'
            }
        }
    });

    grunt.registerTask('bower', ['bower']);
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('build', [
        'clean:dist',
        'jshint',
        'requirejsbuild',
        'uglify',
        'clean:server'
    ]);
};