var ClassObj = require("./classobjectstuff");
var calandar = require("./calandarstuff");
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


    extractInfo($);
    window.close();
    console.log(classes);
    calandar(classes).save(argv.o);
}
var doc = jsdom.env({
    file: argv.f,
    done: callme
});


function extractInfo($) {
    $(".PAGROUPDIVIDER").parent().parent().each(function () {
        var classname = $(this).find(".PAGROUPDIVIDER").text();
        var parts = $(this).find(".PSLEVEL3GRIDROW").find(".PSEDITBOX_DISPONLY,.PSHYPERLINKDISABLED,.PSLONGEDITBOX").map(function () {
            return $(this).text();
        }).get();

        classes.push(new ClassObj(classname, parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6]));
    });
}