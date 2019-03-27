const fs = require('fs')
const axios = require('axios')

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