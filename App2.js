let fs = require("fs");
let Jsdom = require("jsdom");
let Parser = require("rss-parser");

let parser = new Parser();

const feedUrl = "https://prtimes.jp/companyrdf.php?company_id=25043"

async function main() {
  let feed = await parser.parseURL(feedUrl);
  let urls = []

  feed.items.forEach(item => {
    // let date = new Date(item.date)
    // let release = {
    //   "day": date.toLocaleDateString(),
    //   "category": "プレスリリース",
    //   "content": item.title,
    //   "url": item.link,
    //   "image": "",
    // }
    urls.push(item.link);
  })
  // console.table(urls)

  const urls2 = [
    "https://prtimes.jp/main/html/rd/p/000000027.000025043.html",
    "https://prtimes.jp/main/html/rd/p/000000208.000025043.html",
  ]

  Promise.all(urls2.map(getRelease)).then( results => {
    console.table(results)
    console.log("------ 処理終わり")
  })
}

function getRelease(url) {
  fetch(url).then(res =>{
    if(res.ok) {
      res.text().then(async text => {
        const dom = new Jsdom.JSDOM(text);
        const imageUrl = dom.window.document.querySelector("meta[property='og:image']").content
        const filename = await getOgImage(imageUrl)
        console.log(`おわり => ${filename}`)

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
