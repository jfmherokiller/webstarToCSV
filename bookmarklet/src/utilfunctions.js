/**
 * Created by jfmmeyers on 8/19/16.
 */
//replace the whole document with the contents of the iframe

function replaceWithIframeContents(IframeID) {
    //this is a very dirty hack but it works pretty damn well
    //the reason why the script must overwrite the page with the contents of the iframe is
    // because trying to access the iframe without doing so seems to have alot of unusual behavior.
    // like elements that dont yet exist or as far as my development which involved the chrome dev console
    // seemed to show that was the case.
    // this gets around the issue of accessing the internals of the iframe from outside the iframe by just copying the
    // whole iframe html src into the below iframesrc var.Then it uses window.document.write to write the contents to
    // the page which was cleared by window.document.write.
    // rn im extremely impressed that my pcs have enough ram to hold all the damn text in that one var
    var iframesrc = $(IframeID).contents().find("html")[0].outerHTML;
    var maindoc = window.document.open("html/text");
    maindoc.write(iframesrc.toString());
    maindoc.close();
}

function LoadOurselves(iframeId)
{
    //this function injects the script into the iframe of our choosing and in this case its the iframe holding the schedule
    var scriptlink = document.createElement("script");

    scriptlink.src = "https://gitcdn.xyz/repo/jfmherokiller/webstarToCSV/master/public/bookie.js";
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