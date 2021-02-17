const fs = require('fs')
const path = require('path')
const util = require('util')
const ejs = require('ejs')
const sass = require('sass')
const ejsRenderFile = util.promisify(ejs.renderFile)

const rootEJSInPath = path.join(__dirname, 'ejs')
const rootSCSSInPath = path.join(__dirname, 'scss')

async function renderSingleSCSSFile(inPath, outPath) {
  const cssOutPath = outPath.replace(/\.scss$/,".css")
  const result = sass.renderSync({
    file: inPath,
    // outFile: cssOutPath, // for map-hinting purposes
    outputStyle: "compressed",
  });
  fs.writeFileSync(cssOutPath,result.css)
}

async function renderSingleEJSFile(inPath, outPath) {
  const ejsData = {}
  const outText = await ejs.renderFile(inPath, ejsData, {
    root: rootEJSInPath,
  })
  const htmlOutPath = outPath.replace(/\.ejs$/,".html")
  fs.writeFileSync(htmlOutPath,outText)
}

async function walk(inPath, outPath, async_cb) {
  let queue = []
  queue.push({inPath, outPath})
  const originalInPathLength=inPath.length // todo better printing to show actual website "file" structure (?)

  while (queue.length > 0) {
    const {inPath, outPath} = queue.pop()
    console.log(`rendering ${inPath.substring(originalInPathLength)}`)

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
      await async_cb(inPath, outPath)
    }
  }
}

;(async function() {
  // compile CSS first so that html that `include`s css inline will be up-to-date
  await walk(rootSCSSInPath, path.join(__dirname, 'docs/stylesheets'), renderSingleSCSSFile)
  await walk(rootEJSInPath, path.join(__dirname, 'docs'), renderSingleEJSFile)
})()
