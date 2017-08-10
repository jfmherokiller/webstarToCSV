function InjectScope() {
    $ = require('../../libfiles/jquery-3.1.0').noConflict(true);
    var utils = require("./utilfunctions");
    var sharedstuff = require("../../shared/src/SharedUilityFunctions");
    window.addEventListener("DOMContentLoaded", stage2, false);
//if print page iframe thing found then do the magic
    if ($("#ptifrmtgtframe").length)
    {
        utils.LoadOurselves("#ptifrmtgtframe");
        utils.replaceWithIframeContents("#ptifrmtgtframe");

    } else if (($(".PAGROUPDIVIDER").length) & (document.title === "My Class Schedule")) {
        window.removeEventListener("DOMContentLoaded", stage2, false);
        stage2();
    }
    function stage2() {
        if (($(".PSRADIOBUTTON").length != 0) || ($("#DERIVED_CLASS_S_START_DT_LBL").length != 0)) {
            alert("Error Wrong Page Please go to the printer Friendly Listview Page");
        }
        var calandar = require("../../parsefromhtmlfile/src/calandarstuff");
        var classes = [];
        sharedstuff.extractinfo(classes,$);
        utils.downloadfile(calandar(classes).toString(), "cool.ics");
    }
}

exports.scriptinejct = InjectScope;
