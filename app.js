const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
const _ = require('lodash')
const { TaskSystem, download } = require('npm-flyc')
const { ipcRenderer } = require('electron')

// const ipcRenderer // 似乎是electron 的內建東東

var contents = fs.readFileSync('./imageArray.json'),
    json = JSON.parse(contents);

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
                    console.error(error);
                });
            this.totalImagesNumber = totalImagesNumber;
            this.totalPagesNumber = Math.ceil(totalImagesNumber / 30);

            this.getAllImagesId(this.totalPagesNumber);
        },

        async getAllImagesId(page_number) {
            var baseUrl = this.baseUrl,
                keyword = this.keyword,
                taskArray = [],
                task_search = null;

            for (var i = 1; i <= page_number; i++) {
                taskArray.push(_createReturnFunction(i));
            }
            task_search = new TaskSystem(taskArray, 32);

            console.log('');
            var response = await task_search.doPromise();

            var allImagesId = _.chain(response)
                .map(function(item) {
                    return item.data;
                })
                .flattenDepth(1)
                .value();

            this.getAllImageUrl(allImagesId);

            function _createReturnFunction(page) {
                var url = baseUrl + '/search.php?search=' + keyword + '&page=' + page
                return function() {
                    return axios({
                        method: 'get',
                        url: url,
                    }).then(function(data) {
                        var $ = cheerio.load(data.data),
                            list = $('.thumb-container-big .boxgrid a'),
                            returnArray = [];
                        for (var i = 0; i < list.length; i++) {
                            returnArray.push($(list[i]).attr('href').split('big.php?i=')[1]);
                        }

                        return returnArray;
                    }).catch(function(error) {
                        console.error(error);
                    });
                }
            }

        },
        async getAllImageUrl(allImagesId) {
            var baseUrl = this.baseUrl,
                taskArray = [],
                task_search = null;

            allImagesId.forEach(function(image_id) {
                taskArray.push(_createReturnFunction(image_id));
            });
            task_search = new TaskSystem(taskArray, 32);

            var response = json;
            console.log(response);

            this.imageList = [...response].map((url) => {
                return {
                    name: url,
                    url
                };
            });

            this.startDownLoad();

            return;

            // TODO: for now

            console.log('');
            var response = await task_search.doPromise(),
                allImagesSrc = _.chain(response)
                .map(function(item) {
                    return item.data;
                })
                .flattenDepth(1)
                .value();

            this.imageList = [...allImagesSrc].map((url) => {
                return {
                    name: url,
                    url
                };
            });
            // startDownLoad(allImagesSrc);
            fs.writeFileSync(`./imageArray.json`, JSON.stringify(allImagesSrc));

            function _createReturnFunction(image_id) {
                var url = baseUrl + '/big.php?i=' + image_id;
                return function() {
                    return axios({
                        method: 'get',
                        url: url
                    }).then(function(res) {
                        var data = res.data,
                            $ = cheerio.load(data),
                            src = $('div.center.img-container-desktop a').attr('href');
                        return src;
                    }).catch(function(error) {
                        console.error(error);
                    });
                };
            }

        },
        async startDownLoad(allImagesSrc) {
            var url = 'https://images8.alphacoders.com/533/533772.jpg';
            console.log(url);
            ipcRenderer.send('download', {
                key: 'value',
                flyc: 'this is custom argument testing'
            });
        },
    },
    mounted() {
        this.getAllImageUrl([]);
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