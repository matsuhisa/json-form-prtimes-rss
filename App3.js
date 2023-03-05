let fs = require("fs");
let Jsdom = require("jsdom");
let Parser = require("rss-parser");

let parser = new Parser();

const feedUrl = "https://prtimes.jp/companyrdf.php?company_id=25043"

async function main() {
  let feed = await parser.parseURL(feedUrl);
  let urls = []

  feed.items.forEach(item => {
    urls.push(item.link);
  })
  // console.table(urls)

  const urls2 = [
    "https://prtimes.jp/main/html/rd/p/000000027.000025043.html",
    "https://prtimes.jp/main/html/rd/p/000000208.000025043.html",
    "https://prtimes.jp/main/html/rd/p/000000207.000025043.html",
  ]
  // 順番に終わるが 1つずつ
  // urls2.forEach(async url => {
  //   await getRelease(url)
  // })

  // 違う -------
  // function hoge1 (url) {
  //   fetch(url).then(res => {
  //     res.text()
  //     console.log("hoge")
  //   })
  // }

  // Promise.all(urls2.map(url => hoge1(url))).then( results => {
  //   results.forEach(text => console.log(text))
  //   console.log("------ 処理終わり")
  // } )
  // 違う -------

  const targets = [
    "https://httpstat.us/200",
    "https://httpstat.us/201",
    "https://httpstat.us/202",
    "https://httpstat.us/203"
  ];

  function normalHoge(target){
    fetch(target).then(result => result.text())
  }
  async function asyncHoge(target){
    fetch(target).then(result => result.text())
  }
  function returnHoge(target){
    return fetch(target).then(result => result.text())
  }

  // console.log(normalHoge("https://httpstat.us/203"))
  // console.log(asyncHoge("https://httpstat.us/203"))
  // console.log(returnHoge("https://httpstat.us/203"))
  // console.log(fetch("https://httpstat.us/203").then(result => result.text()))

  Promise.all(
    targets.map(target => returnHoge(target))
  ).then(results => {
    console.table(results)
    console.log("------ 処理終わり")
  });


  // これはOK
  // const targets = [
  //   "https://httpstat.us/200",
  //   "https://httpstat.us/201",
  //   "https://httpstat.us/202",
  //   "https://httpstat.us/203"
  // ];
  // Promise.all(
  //   targets.map(target => fetch(target).then(result => result.text()))
  // ).then(results => {
  //   console.table(results)
  //   console.log("------ 処理終わり")
  // });

  // Promise.all(urls2.map(getRelease)).then( results => {
  //   console.table(results)
  //   console.log("------ 処理終わり")
  // })
}

function getRelease(url) {
  fetch(url).then(res =>{
    if(res.ok) {
      res.text()
      .then(async text => {
        const dom = new Jsdom.JSDOM(text);
        const imageUrl = dom.window.document.querySelector("meta[property='og:image']").content
        console.log("hoge 1");
        return imageUrl
      }).then(async imageUrl => {
        console.log(imageUrl);
        const filename = await getOgImage(imageUrl)
        console.log("hoge 2");
        console.log(filename);
        return filename;
      })
    }
  })
}

async function getOgImage(imageUrl) {
  const res = await fetch(imageUrl);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filename = imageUrl.match(".+/(.+?)([\?#;].*)?$")[1];
  fs.writeFileSync(`./src/image/${filename}`, buffer);
  return filename;
}

main();
