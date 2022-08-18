# This repo has been archived
This was never properly designed for the end user and was full of bugs and possible security issues  
I've completely rewritten this mod from the ground up and I reccomend that version instead  
The rewrite is available at [DrJackieBright/CP77-External-Radio-red4ext](https://github.com/DrJackieBright/CP77-External-Radio-red4ext)  

# [ Cyberpunk 2077 External Radio ]

This is the simplest and most versatile solution I could find for a radio replacer.

## [ How it works ]
- CET script writes to a JSON file whenever the user enters or exits a vehicle
- The relay.exe file watches that JSON file and simulates a keypress of the media play or pause key
- Your system handles this keypress and pauses or plays music as necessary

## [ Installation ]
- Place GameUI.lua, init.lua, output.json, and relay.exe into a folder in `...\Cyberpunk 2077\bin\x64\plugins\cyber_engine_tweaks\mods`
- Run relay.exe whenever you want to use the mod

## [ Features ]
- Hotkeys to manually toggle the playing status and to disable the mod
- Simple GUI with the same functionality as the hotkeys

## [ Issues ]
- Play and pause keypresses are often treated interchangably, so the media player may become out of sync with the mod. This can be fixed by manually playing or pausing the player to match the mod.

## [ Credits ]
- Uses psiberx's GameUI.lua and a line from GameHUD.lua ([Available on GitHub](https://github.com/psiberx/cp2077-cet-kit))
