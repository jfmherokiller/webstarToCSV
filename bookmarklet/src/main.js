/**
 * Created by jfmmeyers on 8/19/16.
 */
var $ = require('../../libfiles/jquery-3.1.0').noConflict(true);
var utils = require("./utilfunctions");

if($("#ptifrmtgtframe").length)
{
    utils.LoadOurselvesIntoIframeButDontExecute("#ptifrmtgtframe");
    utils.replaceWithIframeContents("#ptifrmtgtframe");
}