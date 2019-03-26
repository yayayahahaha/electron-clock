const moment = require('moment')
const fs = require('fs')
const axios = require('axios')

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

const db = fs.readFileSync('db.json')
let json = JSON.parse(db)
json.hello = 'there'

fs.writeFileSync('db.json', JSON.stringify(json, null, 2))


/* ============================================================== */
// notification

const notifier = require('node-notifier')
const path = require('path')

function notice(msg) {
    notifier.notify({
        title: '哈囉是我',
        message: msg,
        sound: false
    });
}