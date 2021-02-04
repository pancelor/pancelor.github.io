const fs = require('fs')
const path = require('path')
const util = require('util')
const ejs = require('ejs')
const ejsRenderFile = util.promisify(ejs.renderFile)

const rootInPath = path.join(__dirname, 'templates')

// TODO: set up nodemon to watch .ejs files
// maybe call this script with path arg to only render that path?
// can npm start do two things at once?

async function renderSingleFile(inPath, outPath) {
  const ejsData = {}
  const outText = await ejs.renderFile(inPath, ejsData, {root: rootInPath})
  const htmlOutPath = outPath.replace(/\.ejs$/,".html")
  fs.writeFileSync(htmlOutPath,outText)
}

async function main() {
  let queue = []
  queue.push({
    inPath: rootInPath,
    outPath: path.join(__dirname, 'public'),
  })

  while (queue.length > 0) {
    const {inPath, outPath} = queue.pop()
    console.log(`rendering ${inPath.substring(rootInPath.length)}`)

    if (fs.statSync(inPath).isDirectory()) {
      // ## If inPath is a directory, mkdir outPath and push onto queue
      fs.mkdirSync(outPath,{recursive: true}) // touch
      const relPaths = fs.readdirSync(inPath)
      relPaths.forEach((relPath) => {
        if (relPath.indexOf("_") === 0) {
          // ## Skip paths starting with underscore
        } else {
          queue.push({
            inPath: path.join(inPath,relPath),
            outPath: path.join(outPath,relPath),
          })
        }
      })
    } else {
      // ## Otherwise, run EJS on inPath and save it as outPath
      await renderSingleFile(inPath, outPath)
    }
  }
}

main()
