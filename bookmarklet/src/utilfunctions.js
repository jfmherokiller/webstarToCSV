/**
 * Created by jfmmeyers on 8/19/16.
 */
//replace the whole document with the contents of the iframe
function replaceWithIframeContents(IframeID) {
    var iframesrc = jQuery(IframeID).contents().find("html")[0].outerHTML;
    var maindoc = window.document.open("html/text");
    maindoc.write(iframesrc.toString(),"replace");
    maindoc.close();
}
function runclickEvent(elementid)
{
    $(elementid).trigger("click");
}
function LoadOurselvesIntoIframeButDontExecute(iframeId)
{
        jQuery.get("insert production url here", function(data){
        var scripttaggy = $("<script>").prop('type', "text/javascript").text("").prop("id","magicspot");
        jQuery(iframeId).contents().find("head").append(scripttaggy);
        jQuery(iframeId).contents().find("#magicspot").text(data);
    },"text");
}


exports.replaceWithIframeContents = replaceWithIframeContents;
exports.LoadOurselvesIntoIframeButDontExecute = LoadOurselvesIntoIframeButDontExecute;