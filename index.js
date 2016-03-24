'use strict';

// Usage:
//var timer = require('rv-common-utils/perf/timer');
//var timerObj = timer.startTimer('Time test');
//[var str = ] timerObj.stopTimer([noLog]);

/**
 * Выдает строку, сколько прошло милисекунд относительно startTime.
 *
 * @param {Number} startTime - результат вызова process.hrtime().
 * @param {Number} [digits = 5] - количество цифр после запятой.
 * @returns {string} - Строка, содержащая время в милисекундах.
 */
exports.timeDiffStr = function(startTime, digits) {
    digits = digits || 5;
    var diff = process.hrtime(startTime);
    var elapsed = diff[0] * 1000 + diff[1] / 1e6;
    return elapsed.toFixed(digits).toString() + ' ms';
}

/**
 * Запустить таймер.
 *
 * @param {String} [msg = ''] - сообщение при остановке таймера.
 * @returns {Object {startTime, msg}} - объект, который можно послать в stopTimer.
 */
exports.startTimer = function (msg) {
    msg = msg || '';
    return {
        startTime: process.hrtime(),
        msg: msg,
        /**
         * Остановить таймер.
         * @param {Boolean} [noLog] - Если true - то логировать не надо, а просто вернуть строку,
         * чтобы caller делал с ней, что хочет.
         * @returns {string} - строка, содержащая сообщение и время.
         */
        stopTimer: function (noLog) {
            return exports.stopTimer(this, noLog);
        }
    };
};

/**
 * Ещё один вариант остановить таймер.
 * @param {Object}
 * @param {Boolean} [noLog] - Если true - то логировать не надо, а просто вернуть строку,
 * чтобы caller делал с ней, что хочет.
 * @returns {string} - строка, содержащая сообщение и время.
 */
exports.stopTimer = function(timerObj, noLog) {
    if (!timerObj) {
        return;
    }
    var str = 'Timer: ' + timerObj.msg + ' (' + exports.timeDiffStr(timerObj.startTime) + ')';
    if (!noLog) {
        console.log(str);
    }
    return str;
};
