"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToArray = exports.reverseObj = exports.whatTextType = exports.whatType = exports.uuid = void 0;
var uuid = function () { return Math.random().toString(36).slice(-8); };
exports.uuid = uuid;
// const DOMAIN_REGEX =
//   '(^((http|wss|ws|ftp|https)://))|(^(((http|wss|ws|ftp|https)://)|)(([\\w\\-_]+([\\w\\-\\.]*)?(\\.(' +
//   DOMAIN_CONSTANT.join('|') +
//   ')))|((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))|(localhost))((\\/)|(\\?)|(:)|($)))';
var whatType = function (data) {
    if (data === undefined) {
        return 'undefined';
    }
    if (data === null) {
        return 'null';
    }
    if (data instanceof Array) {
        return 'array';
    }
    if (data instanceof Object) {
        return 'object';
    }
    if (typeof data === 'string') {
        return 'string';
    }
    if (typeof data === 'number') {
        return 'number';
    }
    if (typeof data === 'boolean') {
        return 'boolean';
    }
    return 'unknown';
};
exports.whatType = whatType;
/**
 * judge text content type
 * @returns textType - xml|json|html|text
 */
var whatTextType = function (tmpText) {
    // TODO it can be better
    var tmpCompareText = tmpText.replace(/\s/g, '');
    if (/^({|\[)(.*)(}|])$/.test(tmpCompareText) && JSON.parse(tmpCompareText)) {
        return 'json';
    }
    else if (/^(<)(.*)(>)$/.test(tmpCompareText)) {
        if (/^(<!DOCTYPEhtml>)|(html)/i.test(tmpCompareText)) {
            return 'html';
        }
        else {
            return 'xml';
        }
    }
    else {
        return 'text';
    }
};
exports.whatTextType = whatTextType;
/**
 * reverse object key and value
 * @param obj
 */
var reverseObj = function (obj) {
    return Object.keys(obj).reduce(function (acc, key) {
        acc[obj[key]] = key;
        return acc;
    }, {});
};
exports.reverseObj = reverseObj;
/**
 * reverse object key and value
 * @param obj
 */
var objectToArray = function (obj) {
    return Object.keys(obj).map(function (val) { return ({
        key: val,
        value: obj[val],
    }); });
};
exports.objectToArray = objectToArray;
//# sourceMappingURL=index.js.map