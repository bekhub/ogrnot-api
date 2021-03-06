"use strict";

var httpStatus = require("http-status");

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var studentInfo = require("../lib/student-info");

function studentInfoService(req, res) {
    var authKey = req.header("authorization");

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res
                .status(err.code)
                .json(err);
        } else {
            var jar = sessionStore.getJar(authKey);

            studentInfo(jar, function (err, student) {
                if (err) {
                    res
                        .status(err.code)
                        .json(err);
                } else {
                    res
                        .status(httpStatus.OK)
                        .json(student);
                }
            });
        }
    });
}

module.exports = studentInfoService;