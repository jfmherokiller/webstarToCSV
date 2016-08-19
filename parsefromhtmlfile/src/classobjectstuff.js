/**
 * Created by jfmmeyers on 8/17/16.
 */
var moment = require('moment-timezone');

function ClassObj(Classname, Number, Section, Component, DaysAndTimes, Room, InstructorName, StartAndEnd) {
    var daysandtimestemp = DaysAndTimes;
    var daystemp = daysandtimestemp.split(" ")[0];
    var classstarttemp = moment(StartAndEnd.split("-")[0].trim(), "MM-DD-YYYY")._d;
    var classendtemp = moment(StartAndEnd.split("-")[1].trim(), "MM-DD-YYYY")._d;
    var timestarttemp = daysandtimestemp.replace(daystemp, "").trim().split("-")[0].trim();
    var timeendtemp = daysandtimestemp.replace(daystemp, "").trim().split("-")[1].trim();
    this.days = daystemp.toLocaleLowerCase().match(/[\s\S]{1,2}/g);
    this.timestart = moment.tz(timestarttemp, "hh:mmA", moment.tz.guess())._d;
    this.timeend = moment.tz(timeendtemp, "hh:mmA", moment.tz.guess())._d;
    this.classname = Classname;
    this.numberAndSection = Number + "-" + Section;
    this.instructorname = InstructorName;
    this.room = Room;
    this.classstart = classstarttemp;
    this.classEnd = classendtemp;
    this.component = Component;
}
/**
 * @return {string}
 */
ClassObj.prototype.Description = function () {
    return this.instructorname + " " + this.numberAndSection + " " + this.component;
};

module.exports = ClassObj;