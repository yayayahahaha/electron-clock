const fs = require('fs')
const axios = require('axios')

const vm = new Vue({
    el: '#app',
    data: {
        message: '',
        imageList: []
    },
    mounted() {
        this.imageList = new Array(10).fill().map((number, index) => {
            return {
                name: index + 1
            }
        })
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