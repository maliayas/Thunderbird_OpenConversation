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
    });

    grunt.loadNpmTasks("grunt-zip");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask("build-xpi", "Build Mozilla addon", [
        "clean:build",
        "clean:dist",
        "copy:source",
        "zip:create_chrome_jar",
        "zip:create_xpi",
        "clean:build",
    ]);
};
