let fs = require("fs").promises;
let Jsdom = require("jsdom");
let Parser = require("rss-parser");

let parser = new Parser();

const feedUrl = "https://prtimes.jp/companyrdf.php?company_id=25043"

async function main() {
  let feed = await parser.parseURL(feedUrl);

  console.log("------ 処理開始")
  Promise.all(feed.items.map(item => getRelease(item))).then( results => {
    results.sort((a,b) => new Date(b.day).valueOf() - new Date(a.day).valueOf())
    console.table(results)

    let jsonData = JSON.stringify({news: results}, null, "  ");
    fs.writeFile("./data/news.json", jsonData).then(() => {
      console.log("------ json 書き込み終わり")
      console.log("------ 処理終わり")
    });
  })
}

function getRelease(item) {
  const url = item.link
  return fetch(url).then(res => {
    return res.text()
    .then(text => {
      const dom = new Jsdom.JSDOM(text);
      const imageUrl = dom.window.document.querySelector("meta[property='og:image']").content
      return imageUrl
    })
    .then(async imageUrl => {
      const filename = await getOgImage(imageUrl)
      let date = new Date(item.date)

      let release = {
        "day": date.toLocaleDateString(),
        "category": "プレスリリース",
        "content": item.title,
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
    console.log("画像 書き込み終わり");
    return filename;
  });
}

main();
