/**
 * Created by jfmmeyers on 8/17/16.
 */
var cal = require('../../libfiles/icalpatched/index')();
var moment = require('moment-timezone');
function testing(classlist) {

    classlist.forEach(createEvents);
    console.log(cal.toString());
    return cal;

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
        timezone: moment.tz.guess(),
        repeating: {
            freq: 'WEEKLY', // required
            until: element.classEnd,
            byDay: element.days
        }
    });
}


module.exports = testing;