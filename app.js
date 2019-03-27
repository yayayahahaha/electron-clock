const fs = require('fs')
const axios = require('axios')

const vm = new Vue({
    el: '#app',
    data: {
        message: ''
    }
})







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