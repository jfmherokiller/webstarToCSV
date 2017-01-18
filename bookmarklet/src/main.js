/**
 * Created by jfmmeyers on 8/19/16.
 */
$ = require('../../libfiles/jquery-3.1.0').noConflict(true);
var utils = require("./utilfunctions");
window.addEventListener("DOMContentLoaded", stage2, false);
if ($("#ptifrmtgtframe").length) {

    utils.LoadOurselves("#ptifrmtgtframe");
    utils.replaceWithIframeContents("#ptifrmtgtframe");

} else if (($(".PAGROUPDIVIDER").length) & (document.title === "My Class Schedule")) {
    window.removeEventListener("DOMContentLoaded", stage2, false)
    stage2();
}
function stage2() {
    if (($(".PSRADIOBUTTON").length != 0) || (jQuery("#DERIVED_CLASS_S_START_DT_LBL").length != 0)) {
        alert("Error Wrong Page Please go to the printer Friendly Listview Page");
    }
    var calandar = require("../../parsefromhtmlfile/src/calandarstuff");
    var classes = [];
    extractInfo(classes);
    utils.downloadfile(calandar(classes).toString(), "cool.ics");
}

function extractInfo(classarray) {
    var ClassObj = require("../../parsefromhtmlfile/src/classobjectstuff");
    $('[id^="win0divDERIVED_REGFRM1_DESCR20"]').each(function () {
        var classname = $(this).find(".PAGROUPDIVIDER").text();
        var previousclassparts = null;
        $(this).find('[id^="trCLASS_MTG_VW\$"]').each(function () {
            var parts = $(this).find(".PSEDITBOX_DISPONLY,.PSHYPERLINKDISABLED,.PSLONGEDITBOX").map(function () {
                return $(this).text();
            }).get();
            for(var partsindex = 0; partsindex < parts.length; partsindex++ )
            {
                if(parts[partsindex] == '\xa0')
                {
                    parts[partsindex] = previousclassparts[partsindex]
                }
            }
            previousclassparts = parts;
            classarray.push(new ClassObj(classname, parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6]));

        });
    });
}

