let fs = require("fs").promises;

async function main() {
  const ogImageUrl = "https://prtimes.jp/i/25043/74/ogp/d25043-74-815631-0.jpg?hogehoge"
  const res = await fetch(ogImageUrl);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filename = ogImageUrl.match(".+/(.+?)([\?#;].*)?$")[1];

  fs.writeFile(`./src/image/${filename}`, buffer).then( result => {
    console.table(result)
    console.table("ファイル書き込み")
  });
}

const result = main();
console.table(result);
