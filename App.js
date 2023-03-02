let Jsdom = require("jsdom");
let Parser = require("rss-parser");
let fs = require("fs");
let parser = new Parser();

const feedUrl = "https://prtimes.jp/companyrdf.php?company_id=25043"

async function getRss() {
  let feed = await parser.parseURL(feedUrl);
  // console.log(feed.title);
  let releases = []


  feed.items.forEach(item => {
    let date = new Date(item.date)
    let release = {
      "day": date.toLocaleDateString(),
      "category": "プレスリリース",
      "content": item.title,
      "url": item.link,
      "image": "",
    }
    // fetch(item.link).then(res => {
    //   if(res.ok) {
    //     res.text().then(text => {
    //       const dom = new Jsdom.JSDOM(text);
    //       console.log(dom.window.document.querySelector("meta[property='og:image']").content);
    //     })
    //   }
    // })
    releases.push(release);
  })

  let jsonData = JSON.stringify({news: releases}, null, "  ");
  fs.writeFileSync("./data/news.json", jsonData);
  // console.table(jsonData);
}

getRss();
