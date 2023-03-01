let Parser = require('rss-parser');
let parser = new Parser();
const feedUrl = "https://prtimes.jp/companyrdf.php?company_id=25043"

async function getRss() {
  let feed = await parser.parseURL(feedUrl);
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log("------------");
    console.log(item.title);
    console.log(item.link);
    console.log("------------");
  })
}

getRss();
