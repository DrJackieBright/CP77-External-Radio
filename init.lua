local GameUI = require('GameUI')
local GameHUD = require('GameHUD')
local enabled = true
local value = {}

registerForEvent("onInit", function()
    GameHUD.Init()
    GameUI.OnVehicle(function(state)
        saveValue(state.isVehicle)
    end)

    print("radio reporter loaded")
end)

registerHotkey('Toggle', 'Toggle', function()
    enabled = enabled == false
    Game['PreventionSystem::ShowMessage;GameInstanceStringFloat']('Toggled radio control to ' .. tostring(enabled), 1.5) --stolen from psiberx's gameHUD.lua
    print('Toggled radio control to ' .. tostring(enabled))
end)

registerHotkey('PlayPause', 'Play/Pause', function()
    saveValue(value.value == false)
end)

function saveValue(state)
    if (enabled == false) then
        return
    end
    value.value = state
    local f = io.open("output.json", "w")
    f:write(json.encode(value))
    f:close()
    return value
end