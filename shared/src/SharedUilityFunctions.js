function extractInfo(classarray,$) {
    var ClassObj = require("../../parsefromhtmlfile/src/classobjectstuff");
    $('[id^="win0divDERIVED_REGFRM1_DESCR20"]').each(function () {
        var classname = $(this).find(".PAGROUPDIVIDER").text();
        var previousclassparts = "";
        $(this).find('[id^="trCLASS_MTG_VW\$"]').each(function () {
            var parts = $(this).find(".PSEDITBOX_DISPONLY,.PSHYPERLINKDISABLED,.PSLONGEDITBOX").map(function () {
                return $(this).text();
            }).get();
            if (parts.length < previousclassparts.length) {
                var data = [];
                var length = previousclassparts.length - parts.length; // user defined length
                for (var i = 0; i < length; i++) {
                    data.push('\xa0');
                }
                parts = data.concat(parts);
            }
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

function runclickEvent(elementid,$)
{
    $(elementid).trigger("click");
}
exports.extractinfo = extractInfo;
exports.runclickevent = runclickEvent;
