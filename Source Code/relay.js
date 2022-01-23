/*jshint esversion: 10 */ 

/**
 * modifies console.log to prepend a timestamp
 */
let oldLog = console.log
console.log = function (params) {
  oldLog("[" + new Date().toLocaleTimeString() + "]", params)
}

const fs = require('fs');
const robot = require("robotjs")

/**
 * contains the link to the output file as a string
 * @constant
 */
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

/**
 * Attempts to locate the output.json file in the present directory, and the next two directories up
 * 
 * @returns the url of output.json as a string
 */
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

/**
 * Contains the previous state of {@link file}
 */
let previous = {};

try {previous = JSON.parse(fs.readFileSync(file).toString())}
catch {return}

fs.watch(file, (event, filename) => {
  if (filename) {
    let current = null
    try {current = JSON.parse(fs.readFileSync(file).toString())}
    catch {return}
    if (current.enabled != previous.enabled)
      console.log(`Sender ${(current.enabled)?"Enabled":"Disabled"}`)
    if (current.mode != previous.mode)
      console.log("Mode switching is not yet supported")
    if (current.value != previous.value) {
      console.log(`Playing status changed to ${current.value}`);
      if (current) robot.keyTap("audio_play")
      else robot.keyTap("audio_pause")
    }
    previous = current;
  }
});

console.log("Watching " + file)