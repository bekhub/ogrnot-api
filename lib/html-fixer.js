"use strict";

var htmlTidy = require("htmltidy2");

function htmlFixer(body, cb) {
    htmlTidy.tidy(body, function (err, html) {
        if (err) {
            cb(err);
        } else {
            cb(null, html);
        }
    });
}

module.exports = htmlFixer;