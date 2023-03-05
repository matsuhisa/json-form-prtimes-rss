let fs = require("fs").promises;
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

  const urls2 = [
    "https://prtimes.jp/main/html/rd/p/000000027.000025043.html",
    "https://prtimes.jp/main/html/rd/p/000000208.000025043.html",
    "https://prtimes.jp/main/html/rd/p/000000207.000025043.html",
  ]

  console.log("------ 処理開始")
  Promise.all(urls2.map(url => getRelease(url))).then( results => {
    console.table(results)
    console.log("------ 処理終わり")
  })
}

function getRelease(url) {
  return fetch(url).then(res => {
    return res.text()
    .then(text => {
      const dom = new Jsdom.JSDOM(text);
      const imageUrl = dom.window.document.querySelector("meta[property='og:image']").content
      return imageUrl
    })
    .then(async imageUrl => {
      const filename = await getOgImage(imageUrl)
      let release = {
        "category": "プレスリリース",
        "url": url,
        "image": filename,
      }
      return release;
    })
  })
}

async function getOgImage(imageUrl) {
  const res = await fetch(imageUrl);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = imageUrl.match(".+/(.+?)([\?#;].*)?$")[1];
  return fs.writeFile(`./src/image/${filename}`, buffer).then(() => {
    console.log("書き込み終わり");
    return filename;
  });
}

main();
