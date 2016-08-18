/**
 * Created by jfmmeyers on 8/17/16.
 */
var request = require('request');
var cheerio = require('cheerio');
var argv = require('yargs')
    .usage('Usage: $0 -t [loginasWho] -u [username] -p [password]')
    .demand(['t','u','p'])
    .argv;
request.defaults({
    jar: true,
    forever: true
});

function runmainrequests() {
    request('http://webstar.uno.edu/', function (error, response, body) {
        var links = [];
        var $ = cheerio.load(body);
        $(".webstarWrap > .row").children(".webstar-buttons").each(function (i, elem) {
            links[i] = $(this).attr('href');
        });
        if (argv.t === "student")
        {
            openstudentpage();
        }
    });
}
function openstudentpage() {

}
