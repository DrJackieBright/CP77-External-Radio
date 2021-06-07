let oldLog = console.log
console.log = function (params) {
  oldLog("[" + new Date().toLocaleTimeString() + "]", params)
}

const fs = require('fs');
const mediaController = require('node-media-controller');
const child_process = require('child_process');

var ahkProcess

try {
  fs.statSync(".\\keyoverride.ahk")
  ahkProcess = child_process.spawn("AutoHotkey", [".\\keyoverride.ahk"])
} catch (err) {
  if (err.code = "ENOENT") {
    try {
      fs.statSync(".\\keyoverride.exe")
      ahkProcess = child_process.spawn(".\\keyoverride.exe")
    } catch (err) {
      if (err.code = "ENOENT") {
        console.log("no ahk file found")
      } else console.error(err)
    }
  } else console.error(err)
} finally {
  console.log("started ahk")

  ahkProcess.stdout.on('data', (data) => {
    console.log(`AHK: ${data}`);
  });
  
  ahkProcess.stderr.on('data', (data) => {
    console.error(`AHK: ${data}`);
  });
  
  ahkProcess.on('close', (code) => {
    if (!code) return
    console.log(`AHK process exited with code ${code}`);
  });
}

const file = __dirname + "\\..\\output.json"

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
      mediaController.executeCommand('play', (err, res) => {
        if (err) console.dir(err);
        if (res) console.dir(res);
      })
    } else {
      mediaController.executeCommand('pause', (err, res) => {
        if (err) console.dir(err);
        if (res) console.dir(res);
      })
    }
  }
});

console.log("Watching " + file)