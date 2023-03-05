// let Jsdom = require("jsdom");
// let Parser = require("rss-parser");
// let fs = require("fs");


// let parser = new Parser();
// const feedUrl = "https://prtimes.jp/companyrdf.php?company_id=25043"
// async function main(){
//   let releases = []
//   let feed = await parser.parseURL(feedUrl);
// }

let Jsdom = require("jsdom");
let fs = require("fs");

async function getOgImage(imageUrl) {
  const res = await fetch(imageUrl);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filename = imageUrl.match(".+/(.+?)([\?#;].*)?$")[1];
  fs.writeFileSync(filename, buffer);
  return filename;
}

function getRelease(url) {
  fetch(url).then(res =>{
    if(res.ok) {
      res.text().then(async text => {
        const dom = new Jsdom.JSDOM(text);
        const imageUrl = dom.window.document.querySelector("meta[property='og:image']").content
        console.log(imageUrl);
        const filename = await getOgImage(imageUrl)
        console.log(filename);
      })
    }
  })
}

const url = "https://prtimes.jp/main/html/rd/p/000000027.000025043.html";
getRelease(url);
