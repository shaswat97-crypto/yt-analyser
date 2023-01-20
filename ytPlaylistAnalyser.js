const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const url = 'https://www.youtube.com/playlist?list=PLPN21ZkIRg_oQAFzLalMk4H9nFB32ipHG';
let page;
(async function () {
    try {
        //open browser
        let bo = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--screen-maximised']
        })

        //array of open tabs
        let pages = await bo.pages();

        //first tab select kiye
        page = pages[0];

        //link khole
        await page.goto(url);
        await page.waitForSelector('.ytd-playlist-header-renderer #container #text');

        //heading khoje
        /*
        evaulate kiya hai
        puppeteer ka method hai
        input me 2 parameter chiye
        function aur uske arguments
        iska faeda e hai ki, hum document.query vaala function use kar sakte hai, kahe ke 
        evaluate ek page pe perform kia jaata hai
        */
        let heading = await page.evaluate(function (selector, two) {
            let ans = document.querySelector(selector).innerText;
            return ans;
        }, '.ytd-playlist-header-renderer #container #text', '#overlays  #text');

        //yha hum total videos and views nikale
        let data = await page.evaluate(geData, '.ytd-playlist-header-renderer .metadata-stats yt-formatted-string');
        console.log(heading, data.noOfVideos, data.noOfViews);

        //yha tatal vidoe count ka number extract kiye
        let videoCount = data.noOfVideos.split(' ')[0];

        //bina scroll kiye kitna video load hua, ye nikale
        let loadedVideoCount = await page.evaluate(loadedVideos,
            '#content #container #meta h3');
        console.log(loadedVideoCount);

        // scrolling
        while (videoCount - loadedVideoCount > 80) {
            await page.evaluate(scroll);
            function scroll() {
                window.scrollBy(0, window.innerHeight);
            }
            loadedVideoCount = await page.evaluate(loadedVideos, '#content #container #meta h3');
        }

        loadedVideoCount = await page.evaluate(loadedVideos, '#content #container #meta h3');
        console.log(loadedVideoCount);

        //final array
        let allData = await page.evaluate(getNameEtc, '#content #container #meta h3', '#video-info>:first-child');
        console.log(allData.length);
        console.log(allData);


        //json file banae
        //pehle file banae
        let filePath = path.join(__dirname, 'ans.json');
        fs.writeFileSync(filePath, JSON.stringify(allData));
        let jsonData = require('./ans');

        //ab excel banae
        var rawFile = fs.readFileSync("/home/shaswat/coding/pepcoding/projects/automation/ans.json")//dir of your json file as param
        var raw = JSON.parse(rawFile)
        var files = []
        for (each in raw) {
            files.push(raw[each])
        }
        var obj = files.map((e) => {
            return e
        })

        var newWB = xlsx.utils.book_new()

        var newWS = xlsx.utils.json_to_sheet(obj)

        xlsx.utils.book_append_sheet(newWB, newWS, "video-data")//workbook name as param

        filePath = path.join(__dirname, 'videoData.xlsx')
        xlsx.writeFile(newWB, filePath)//file name as param

    } catch (error) {
        console.log(error);
    }
})();

function geData(selector) {
    let elements = document.querySelectorAll(selector);
    let noOfVideos = elements[0].innerText;
    let noOfViews = elements[1].innerText;
    return {
        noOfVideos,
        noOfViews
    };
}

async function loadedVideos(selector) {
    let loadedVideosArr = document.querySelectorAll(selector);
    return loadedVideosArr.length;
}

function getNameEtc(NameSelector, ViewsSelector, DurationSelector) {
    let nameArr = document.querySelectorAll(NameSelector);
    let viewsArr = document.querySelectorAll(ViewsSelector);

    let allData = [];
    for (let i = 0; i < nameArr.length; i++) {
        let name = nameArr[i].innerText;
        let views = viewsArr[i].innerText;
        allData.push({
            SNo: i + 1,
            name,
            views
        })
    }
    return allData;
}

