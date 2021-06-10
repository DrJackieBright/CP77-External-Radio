let oldLog = console.log
console.log = function (params) {
  oldLog("[" + new Date().toLocaleTimeString() + "]", params)
}

const fs = require('fs');
const robot = require("robotjs")

const file = (function() {
  let ret 
  if (process.argv[1].endsWith(__filename)) {
    ret = process.argv[2]
  } else {
    ret = process.argv[1]
  }
  if (!ret) {
    ret = search()
  }
  try {fs.statSync(ret)}
  catch(err) {
    console.error(`file "${ret}" not found`)
    ret = search()
  }
  return ret
})()

function search() {
  console.log("searching for file.")
  try{
    fs.statSync("output.json")
    return process.cwd() + "\\output.json"
  }
  catch{
    console.log("searching for file..")
    try{
      fs.statSync("..\\output.json")
      return process.cwd() + "\\..\\output.json"
    }
    catch{
      console.log("searching for file...")
      try{
        fs.statSync("..\\..\\output.json")
        return process.cwd() + "\\..\\..\\output.json"
      }
      catch{
        throw "Could not find file"
      }
    }
  }
}

let boolPrevious = null;
fs.watch(file, (event, filename) => {
  if (filename) {
    let boolCurrent = null
    try {boolCurrent = JSON.parse(fs.readFileSync(file).toString()).value}
    catch {return}
    if (boolCurrent === boolPrevious) return
    boolPrevious = boolCurrent;
    console.log(`${filename} file Changed to ${boolCurrent}`);
    if (boolCurrent) {
      robot.keyTap("audio_play")
    } else {
      robot.keyTap("audio_pause")
    }
  }
});

console.log("Watching " + file)