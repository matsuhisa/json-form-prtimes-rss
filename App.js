let Parser = require('rss-parser');
let Jsdom = require("jsdom");

let parser = new Parser();
const feedUrl = "https://prtimes.jp/companyrdf.php?company_id=25043"

async function getRss() {
  let feed = await parser.parseURL(feedUrl);
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log("------------");
    console.log(item.title);
    console.log(item.link);
    // fetch(item.link).then(res => {
    //   if(res.ok) {
    //     res.text().then(text => {
    //       const dom = new Jsdom.JSDOM(text);
    //       console.log(dom.window.document.querySelector("meta[property='og:image']").content);
    //     })
    //   }
    // })
    console.log("------------");
  })
}

getRss();
