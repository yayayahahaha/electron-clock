const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const vm = new Vue({
    el: '#app',
    data: {
        baseUrl: 'https://wall.alphacoders.com',
        keyword: 'kill la kill',
        directory: '',

        totalImagesNumber: 0,
        totalPagesNumber: 0,

        imageList: []
    },
    computed: {
        getTotalImagesNumberUrl() {
            return `${this.baseUrl}/search.php?search=${this.keyword}&page=1`
        }
    },
    methods: {
        async search() {
            var url = this.getTotalImagesNumberUrl,
                totalImagesNumber = await axios({
                    method: 'get',
                    url: url
                }).then(function(data) {
                    var $ = cheerio.load(data.data),
                        title = $('h1').text(),
                        totalImagesNumber = title.trim() === '' ? 0 : title.trim().split(' ')[0];

                    return parseInt(totalImagesNumber, 10);
                }).catch(function(error) {
                    debugger
                    console.error(error);
                });
            this.totalImagesNumber = totalImagesNumber;
            this.totalPagesNumber = Math.ceil(totalImagesNumber / 30);

            this.getAllImagesId(this.totalPagesNumber);
        },

        getAllImagesId(page_number) {
            console.log(page_number);
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