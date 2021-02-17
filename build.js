const fs = require('fs')
const path = require('path')
const util = require('util')
const ejs = require('ejs')
const sass = require('sass')
const ejsRenderFile = util.promisify(ejs.renderFile)

const rootInPath = path.join(__dirname, 'templates')

async function renderSingleSCSSFile(inPath, outPath) {
  if (!/\.scss$/.exec(inPath)) return
  const cssOutPath = outPath.replace(/\.scss$/,".css")
  console.log(`rendering scss to ${cssOutPath}`)
  const result = sass.renderSync({
    file: inPath,
    // outFile: cssOutPath, // for map-hinting purposes
    outputStyle: "compressed",
  });
  fs.writeFileSync(cssOutPath,result.css)
}

async function renderSingleEJSFile(inPath, outPath) {
  if (!/\.ejs$/.exec(inPath)) return
  const htmlOutPath = outPath.replace(/\.ejs$/,".html")
  console.log(`rendering ejs to ${htmlOutPath}`)
  const ejsData = {}
  const outText = await ejs.renderFile(inPath, ejsData, {
    root: rootEJSInPath,
  })
  fs.writeFileSync(htmlOutPath,outText)
}

async function walk(inPath, outPath, async_cb) {
  let queue = []
  queue.push({inPath, outPath})

  while (queue.length > 0) {
    const {inPath, outPath} = queue.pop()

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
  await walk(rootInPath, path.join(__dirname, 'docs'), renderSingleSCSSFile)
  await walk(rootInPath, path.join(__dirname, 'docs'), renderSingleEJSFile)
})()
