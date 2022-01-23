local GameUI = require('GameUI')
local value = {value = false, mode = 0, enabled = true}
local showUI = false

registerForEvent("onInit", function()
    local f = io.open("output.json", "r")
    value = json.decode(f:read())
    f:close()

    print(json.encode(value))

    GameUI.OnVehicle(function(state)
        value.value = state.isVehicle
        Export()
    end)

    print("radio reporter loaded")
end)

registerForEvent("onOverlayOpen", function()
    showUI = true
end)

registerForEvent("onOverlayClose", function()
    showUI = false
end)

registerForEvent("onDraw", function()
    if (showUI == false) then
        return
    end

    ImGui.SetNextWindowPos(100, 500, ImGuiCond.FirstUseEver) -- set window position x, y
    ImGui.SetNextWindowSize(600, 300, ImGuiCond.Appearing) -- set window size w, h

    if ImGui.Begin("Radio Relay") then 
        if (ImGui.Button("Playing: " .. tostring(value.value), (ImGui.GetWindowContentRegionWidth()-5)/2, 20)) then
            PlayPause()
        end
        ImGui.SameLine((ImGui.GetWindowWidth()/2) + 5)
        if (ImGui.Button("Enabled: " .. tostring(value.enabled), (ImGui.GetWindowContentRegionWidth()-5)/2, 20)) then 
            ToggleEnable()
        end
        ImGui.NewLine()
        
        ImGui.SetNextItemWidth(ImGui.GetWindowContentRegionWidth() - ImGui.CalcTextSize("Control Mode (Not implemented)"))
        value.mode, clicked = ImGui.Combo("Control Mode (Not implemented)", value.mode, { "Play/Pause", "Mute/Unmute" }, 2, 5)
        if (clicked) then 
            Export()
        end
    end
    ImGui.End()

end)

registerHotkey('Toggle', 'Toggle', function() ToggleEnable() end)

registerHotkey('PlayPause', 'Play/Pause', function() PlayPause() end)

function ToggleEnable()
    value.enabled = value.enabled == false
    Export()
    Game['PreventionSystem::ShowMessage;GameInstanceStringFloat']('Toggled radio control to ' .. tostring(value.enabled), 1.5) --stolen from psiberx's gameHUD.lua
    print('Toggled radio control to ' .. tostring(value.enabled))
end

function PlayPause()
    if (value.enabled) then
        value.value = (value.value == false)
        Export()
    end
end

function Export()
    local f = io.open("output.json", "w")
    f:write(json.encode(value))
    f:close()
    return value
end