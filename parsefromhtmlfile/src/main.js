var ClassObj = require("./classobjectstuff");
var calandar = require("./calandarstuff");
var sharedstuff = require("../../shared/src/SharedUilityFunctions");
var argv = require('yargs')
    .usage('Usage: $0 -f [file] -o [file]')
    .demand(['f','o'])
    .argv;
var fs = require('fs');

var classes = [];


var jsdom = require("jsdom");
function callme(err, window) {
    if (err !== null) {
        throw err;

    }
    var $ = require("../../libfiles/jquery-3.1.0")(window);
    window.$ = $;


    sharedstuff.extractinfo($);
    window.close();
    console.log(classes);
    calandar(classes).save(argv.o);
}
var doc = jsdom.env({
    file: argv.f,
    done: callme
});
