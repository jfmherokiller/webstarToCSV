/**
 * Created by jfmmeyers on 8/17/16.
 */
var ICal = require('../lib/index');
var cal = ICal();

function testing(classlist) {

    classlist.forEach(createEvents);
    console.log(cal.toString());
    cal.save("test.ics");

}
function createEvents(element, index, array) {
    var event = cal.createEvent({
        start: new Date(element.timestart),
        end: new Date(element.timeend),
        timestamp: new Date(),
        summary: element.classname,
        description: element.Description(),
        location: element.room,
        method: "PUBLISH",
        timezone:"America/Chicago",
        repeating: {
        freq: 'WEEKLY', // required
        until: element.classEnd,
        byDay: element.days // repeat only sunday and monday
    }
    });
}


module.exports = testing;