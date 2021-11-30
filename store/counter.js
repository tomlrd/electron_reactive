var counter
// init then set
counter = 0

const counter_get = function () {
    return counter
}
const counter_set = function (nb) {
    return counter = nb
}
const counter_incr = function () {
    var newCounter = counter
    if (counter++ === 0) {
        newCounter = 1
    } else {
        newCounter = counter++
    }
    counter = newCounter
}
exports.counter_get = counter_get;
exports.counter_set = counter_set;
exports.counter_incr = counter_incr;
