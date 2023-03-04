let fs = require("fs");

const main = async () => {
  const ogImageUrl = "https://prtimes.jp/i/25043/74/ogp/d25043-74-815631-0.jpg"
  const res = await fetch(ogImageUrl);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync("image.jpg", buffer);
}

main();
