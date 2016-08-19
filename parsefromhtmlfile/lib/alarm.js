'use strict';


/**
 * @author Sebastian Pekarek
 * @module alarm
 * @constructor ICalAlarm Alarm
 */
var ICalAlarm = function(_data, event) {
    var attributes = ['type', 'trigger', 'triggerBefore', 'triggerAfter', 'repeat', 'interval', 'attach', 'description'],
        vars,
        i,
        data;

    if(!event) {
        throw '`event` option required!';
    }

    vars = {
        types: ['display', 'audio']
    };

    data = {
        type: null,
        trigger: null,
        repeat: null,
        repeatInterval: null,
        attach: null,
        description: null
    };


    /**
     * Set/Get the alarm type
     *
     * @param type Type
     * @since 0.2.1
     * @returns {ICalAlarm|String}
     */
    this.type = function(type) {
        if(type === undefined) {
            return data.type;
        }
        if(!type) {
            data.type = null;
            return this;
        }

        if(vars.types.indexOf(type) === -1) {
            throw '`type` is not correct, must be either `display` or `audio`!';
        }

        data.type = type;
        return this;
    };


    /**
     * Set/Get seconds before event to trigger alarm
     *
     * @param {Number|Date} trigger Seconds before alarm triggeres
     * @since 0.2.1
     * @returns {ICalAlarm|Number|Date}
     */
    this.trigger = function(trigger) {
        if(trigger === undefined && data.trigger instanceof Date) {
            return data.trigger;
        }
        if(trigger === undefined && data.trigger) {
            return -1 * data.trigger;
        }
        if(trigger === undefined) {
            return null;
        }


        if(!trigger) {
            data.trigger = null;
            return this;
        }
        if(trigger instanceof Date) {
            data.trigger = trigger;
            return this;
        }
        if(typeof trigger === 'number' && isFinite(trigger)) {
            data.trigger = -1 * trigger;
            return this;
        }

        throw '`trigger` is not correct, must be either typeof `Number` or `Date`!';
    };


    /**
     * Set/Get seconds after event to trigger alarm
     *
     * @param {Number|Date} trigger Seconds after alarm triggeres
     * @since 0.2.1
     * @returns {ICalAlarm|Number|Date}
     */
    this.triggerAfter = function(trigger) {
        if(trigger === undefined) {
            return data.trigger;
        }

        return this.trigger(typeof trigger === 'number' ? -1 * trigger : trigger);
    };

    /**
     * Set/Get seconds before event to trigger alarm
     *
     * @param {Number|Date} trigger Seconds before alarm triggeres
     * @since 0.2.1
     * @alias trigger
     * @returns {ICalAlarm|Number|Date}
     */
    this.triggerBefore = this.trigger;


    /**
     * Set/Get Alarm Repetitions
     *
     * @since 0.2.1
     * @returns {ICalAlarm|Number}
     * @param repeat
     */
    this.repeat = function(repeat) {
        if(repeat === undefined) {
            return data.repeat;
        }
        if(!repeat) {
            data.repeat = null;
            return this;
        }

        if(typeof repeat !== 'number' || !isFinite(repeat)) {
            throw '`repeat` is not correct, must be numeric!';
        }

        data.repeat = repeat;
        return this;
    };


    /**
     * Set/Get Repeat Interval
     *
     * @since 0.2.1
     * @returns {ICalAlarm|Number|Null}
     * @param interval
     */
    this.interval = function(interval) {
        if(interval === undefined) {
            return data.interval;
        }
        if(!interval) {
            data.interval = null;
            return this;
        }

        if(typeof interval !== 'number' || !isFinite(interval)) {
            throw '`interval` is not correct, must be numeric!';
        }

        data.interval = interval;
        return this;
    };


    /**
     * Set/Get Attachment
     *
     * @since 0.2.1
     * @returns {ICalAlarm|Object}
     * @param _attach
     */
    this.attach = function(_attach) {
        if(_attach === undefined) {
            return data.attach;
        }
        if(!_attach) {
            data.attach = null;
            return this;
        }

        var attach = null;
        if(typeof _attach === 'string') {
            attach = {
                uri: _attach,
                mime: null
            };
        }
        else if(typeof _attach === 'object') {
            attach = {
                uri: _attach.uri,
                mime: _attach.mime || null
            };
        }
        else {
            throw '`attach` needs to be a valid formed string or an object. See https://github.com/sebbo2002/ical-generator#attachstringobject-attach';
        }

        if(!attach.uri) {
            throw '`attach.uri` is empty!';
        }

        data.attach = {
            uri: attach.uri,
            mime: attach.mime
        };
        return this;
    };


    /**
     * Set/Get the alarm description
     *
     * @param description Description
     * @since 0.2.1
     * @returns {ICalAlarm|String}
     */
    this.description = function(description) {
        if(description === undefined) {
            return data.description;
        }
        if(!description) {
            data.description = null;
            return this;
        }

        data.description = description;
        return this;
    };


    /**
     * Export calender as JSON Object to use it later…
     *
     * @since 0.2.4
     * @returns Object Calendar
     */
    this.toJSON = function() {
        var tools = require('./_tools.js');
        return tools.toJSON(this, attributes);
    };


    /**
     * Export Event to iCal
     *
     * @since 0.2.0
     * @returns {String}
     */
    this.generate = function() {
        var tools = require('./_tools.js'),
            g = 'BEGIN:VALARM\r\n';

        if(!data.type) {
            throw 'No value for `type` in ICalAlarm given!';
        }
        if(!data.trigger) {
            throw 'No value for `trigger` in ICalAlarm given!';
        }

        // ACTION
        g += 'ACTION:' + data.type.toUpperCase() + '\r\n';

        if(data.trigger instanceof Date) {
            g += 'TRIGGER;VALUE=DATE-TIME:' + tools.formatDate(data.trigger) + '\r\n';
        }
        else if(data.trigger > 0) {
            g += 'TRIGGER;RELATED=END:' + tools.duration(data.trigger) + '\r\n';
        }
        else {
            g += 'TRIGGER:' + tools.duration(data.trigger) + '\r\n';
        }

        // REPEAT
        if(data.repeat && !data.interval) {
            throw 'No value for `interval` in ICalAlarm given, but required for `repeat`!';
        }
        if(data.repeat) {
            g += 'REPEAT:' + data.repeat + '\r\n';
        }

        // INTERVAL
        if(data.interval && !data.repeat) {
            throw 'No value for `repeat` in ICalAlarm given, but required for `interval`!';
        }
        if(data.interval) {
            g += 'DURATION:' + tools.duration(data.interval) + '\r\n';
        }

        // ATTACH
        if(data.type === 'audio' && data.attach && data.attach.mime) {
            g += 'ATTACH;FMTTYPE=' + data.attach.mime + ':' + data.attach.uri + '\r\n';
        }
        else if(data.type === 'audio' && data.attach) {
            g += 'ATTACH;VALUE=URI:' + data.attach.uri + '\r\n';
        }
        else if(data.type === 'audio') {
            g += 'ATTACH;VALUE=URI:Basso\r\n';
        }

        // DESCRIPTION
        if(data.type === 'display' && data.description) {
            g += 'DESCRIPTION:' + tools.escape(data.description) + '\r\n';
        }
        else if(data.type === 'display') {
            g += 'DESCRIPTION:' + tools.escape(event.summary()) + '\r\n';
        }

        g += 'END:VALARM\r\n';
        return g;
    };


    for(i in _data) {
        if(_data.hasOwnProperty(i) && attributes.indexOf(i) > -1) {
            this[i](_data[i]);
        }
    }
};

module.exports = ICalAlarm;