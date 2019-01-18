const moment = require('moment')

const nowDom = document.querySelector('.current-time')
const alarmDom = document.querySelector('.alarm-time')

// alarmDom.addEventListener('change', onAlarmTextChange)

let time = moment()

let nowTime
let alarmTime

var timmer = setInterval(function() {
    const time = moment().format('HH:mm:ss')
    nowDom.innerText = time
}, 300);