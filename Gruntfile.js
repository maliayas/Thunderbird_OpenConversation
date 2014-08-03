module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        copy: {
            source: {
                cwd: 'src/',
                src: ["**", "!chrome/**"],
                dest: "build/",
                expand: true,
            },
        },

        zip: {
            create_chrome_jar: {
                cwd: "src/chrome/",
                src: ["src/chrome/**"],
                dest: "build/chrome.jar",
            },
            create_xpi: {
                cwd: "build/",
                src: ["build/**"],
                dest: "dist/<%= pkg.name %>.xpi",
            },
        },

        clean: {
            build: {
                src: 'build/',
            },
            dist: {
                src: 'dist/',
            },
        },

        shell: {
            install_xpi: {
                command: "wget --post-file=dist/<%= pkg.name %>.xpi http://localhost:8888/ & exit 0",
            }
        }
    });

    grunt.loadNpmTasks("grunt-zip");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask("build-xpi", "Build Mozilla addon", [
        "clean:build",
        "clean:dist",
        "copy:source",
        "zip:create_chrome_jar",
        "zip:create_xpi",
        "clean:build",
        "shell:install_xpi",
    ]);
};
