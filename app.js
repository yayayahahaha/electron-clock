const fs = require('fs')
const axios = require('axios')

const vm = new Vue({
    el: '#app',
    data: {
        keyword: '',
        imageList: []
    },
    computed: {
        url() {
            return `https://find.ruten.com.tw/s/?q=${this.keyword}`
        }
    },
    methods: {
        async search() {
            const keyword = this.keyword
            const [data, error] = await axios({
                method: 'get',
                url: this.url
            }).then((res) => {
                const dom = new DOMParser().parseFromString(res, "text/xml")
                debugger
                return [dom, null]
            }).catch((error) => {
                return [null, error]
            })

            console.log(data)
        }
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