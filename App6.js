let fs = require("fs").promises;

async function main() {
  let htmlFile = await fs.readFile("./sample.html", 'utf-8');
  console.log(htmlFile)
  // await fs.readFile("./sample.html").then( htmlFile => {
  //   console.log(htmlFile)
  //   return htmlFile
  // })
  const regex = '/data-update=".*"/g'
  const hoge = htmlFile.replace(/data-update=".*"/g, 'data-update="123"')
  await fs.writeFile("output.txt", hoge)
}

main()


