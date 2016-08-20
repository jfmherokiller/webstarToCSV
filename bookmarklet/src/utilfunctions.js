/**
 * Created by jfmmeyers on 8/19/16.
 */
//replace the whole document with the contents of the iframe

function replaceWithIframeContents(IframeID) {
    var iframesrc = $(IframeID).contents().find("html")[0].outerHTML;
    var maindoc = window.document.open("html/text");
    maindoc.write(iframesrc.toString());
    maindoc.close();
}
function runclickEvent(elementid)
{
    $(elementid).trigger("click");
}
function LoadOurselves(iframeId)
{
    var scriptlink = document.createElement("script");

    scriptlink.src = "https://abc03c76ca6e00838ba5d0aad43921446853c64e.googledrive.com/host/0B4YPWGzx_WjeTXhCWWhFd3dWdEk/bookie.js";
    $(iframeId).contents()[0].body.appendChild(scriptlink);
    var checkblock = document.createElement("div");
    checkblock.id = "loaded";
    $(iframeId).contents()[0].body.appendChild(checkblock);
}

function downloadfile(data,filename)
{
    var download = require("../../node_modules/downloadjs/download.min");
    download(data,filename,"text/calendar");
}

exports.replaceWithIframeContents = replaceWithIframeContents;
exports.LoadOurselves = LoadOurselves;
exports.downloadfile = downloadfile;