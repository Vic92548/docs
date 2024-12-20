# Project Documentation

This document contains all MDX and JSON files from the current directory.

## File: development.mdx

```mdx
---
title: 'Development'
description: 'Learn how to preview changes locally'
---

<Info>
  **Prerequisite** You should have installed Node.js (version 18.10.0 or
  higher).
</Info>

Step 1. Install Mintlify on your OS:

<CodeGroup>

```bash npm
npm i -g mintlify
```

```bash yarn
yarn global add mintlify
```

</CodeGroup>

Step 2. Go to the docs are located (where you can find `mint.json`) and run the following command:

```bash
mintlify dev
```

The documentation website is now available at `http://localhost:3000`.

### Custom Ports

Mintlify uses port 3000 by default. You can use the `--port` flag to customize the port Mintlify runs on. For example, use this command to run in port 3333:

```bash
mintlify dev --port 3333
```

You will see an error like this if you try to run Mintlify in a port that's already taken:

```md
Error: listen EADDRINUSE: address already in use :::3000
```

## Mintlify Versions

Each CLI is linked to a specific version of Mintlify. Please update the CLI if your local website looks different than production.

<CodeGroup>

```bash npm
npm i -g mintlify@latest
```

```bash yarn
yarn global upgrade mintlify
```

</CodeGroup>

## Deployment

<Tip>
  Unlimited editors available under the [Startup
  Plan](https://mintlify.com/pricing)
</Tip>

You should see the following if the deploy successfully went through:

<Frame>
  <img src="/images/checks-passed.png" style={{ borderRadius: '0.5rem' }} />
</Frame>

## Troubleshooting

Here's how to solve some common problems when working with the CLI.

<AccordionGroup>
  <Accordion title="Mintlify is not loading">
    Update to Node v18. Run `mintlify install` and try again.
  </Accordion>
  <Accordion title="No such file or directory on Windows">
Go to the `C:/Users/Username/.mintlify/` directory and remove the `mint`
folder. Then Open the Git Bash in this location and run `git clone
https://github.com/mintlify/mint.git`.

Repeat step 3.

  </Accordion>
  <Accordion title="Getting an unknown error">
    Try navigating to the root of your device and delete the ~/.mintlify folder.
    Then run `mintlify dev` again.
  </Accordion>
</AccordionGroup>

Curious about what changed in a CLI version? [Check out the CLI changelog.](/changelog/command-line)

```

## File: functions\ui.mdx

```mdx
---
title: 'User Interface'
description: 'Create and manage custom user interfaces using the Poly Plaza UI Framework'
icon: 'window'
---

<Info>
  Poly Plaza's UI framework combines the power of Unreal Engine's widget system with Lua scripting, allowing you to create dynamic interfaces that seamlessly integrate with the game's visual style.
</Info>

## Understanding the UI System

The UI system in Poly Plaza works by creating a bridge between Lua scripts and Unreal Engine's widget system. When you create a UI through Lua, you're actually:

1. Creating a UI instance that can be shown/hidden
2. Defining a data structure that describes your UI
3. Letting the game engine convert that data into actual widgets

<Note>
  All UIs in Poly Plaza are created using the `CreateUI()` function and require a `ui` table that defines their structure.
</Note>

## Creating Your First UI

Here's how to create a basic UI:

```lua
-- Create a new UI instance
local ui = CreateUI()

-- Define the UI structure
ui.ui = {
    title = "Welcome",
    elements = {
        {
            type = "text",
            content = "Welcome to Poly Plaza!"
        },
        {
            type = "button",
            text = "Close",
            onClick = function()
                ui:Hide()
            end
        }
    }
}

-- Display the UI
ui:Show()
```

### Understanding the UI Structure

Every UI in Poly Plaza requires a specific structure:

```lua
ui.ui = {
    title = string,      -- Window title (optional)
    elements = array     -- Array of UI elements
}
```

Each element in the `elements` array must have at least:
- A `type` field specifying what kind of element it is
- Additional fields depending on the element type

## UI Element Types

### Text Elements

Text elements display static or dynamic text:

```lua
{
    type = "text",
    content = "Hello World",     -- The text to display
    color = "white",            -- Text color (optional)
    size = "normal",           -- Text size: small, normal, large (optional)
    align = "left"            -- Text alignment: left, center, right (optional)
}
```

### Buttons

Buttons allow user interaction:

```lua
{
    type = "button",
    text = "Click Me",           -- Button label
    onClick = function()         -- Click handler
        SendNotification("Clicked!")
    end,
    style = "primary",          -- Button style (optional)
    enabled = true             -- Enable/disable button (optional)
}
```

### Input Fields

Input fields allow text input from users:

```lua
{
    type = "input",
    placeholder = "Type here...",  -- Placeholder text
    defaultValue = "",            -- Initial value (optional)
    onSubmit = function(text)     -- Called when input is submitted
        print("User entered: " .. text)
    end,
    onChange = function(text)     -- Called when input changes (optional)
        print("Current text: " .. text)
    end
}
```

### Images

Display images in your UI:

```lua
{
    type = "image",
    source = "/api/placeholder/400/300",  -- Image source
    alt = "Description",                  -- Alt text
    width = 400,                         -- Width (optional)
    height = 300                         -- Height (optional)
}
```

## Layout Containers

### Basic Container

Group elements together:

```lua
{
    type = "container",
    style = "panel",            -- Container style (optional)
    padding = 10,              -- Padding around content (optional)
    elements = {               -- Child elements
        { type = "text", content = "Item 1" },
        { type = "text", content = "Item 2" }
    }
}
```

### Grid Container

Organize elements in a grid layout:

```lua
{
    type = "grid",
    columns = 2,               -- Number of columns
    spacing = 5,              -- Space between items (optional)
    elements = {              -- Child elements
        { type = "button", text = "1" },
        { type = "button", text = "2" },
        { type = "button", text = "3" },
        { type = "button", text = "4" }
    }
}
```

## Dynamic UIs

You can update UI content at any time by modifying the `ui` table:

```lua
local ui = CreateUI()

-- Initial setup
ui.ui = {
    title = "Counter",
    elements = {
        { type = "text", content = "Count: 0" }
    }
}

local count = 0

-- Function to update the UI
local function updateCounter()
    count = count + 1
    ui.ui = {
        title = "Counter",
        elements = {
            { type = "text", content = "Count: " .. count }
        }
    }
end

-- Add update button
table.insert(ui.ui.elements, {
    type = "button",
    text = "Increment",
    onClick = updateCounter
})

ui:Show()
```

## Managing UI State

Best practices for managing UI state:

### 1. Single UI Instance

Keep a reference to your UI instance if you plan to reuse it:

```lua
local shopUI = CreateUI() -- Store reference

local function openShop()
    shopUI:Show()
end

local function closeShop()
    shopUI:Hide()
end
```

### 2. Updating Content

Update specific parts of your UI when needed:

```lua
local function updateMoney(amount)
    ui.ui.elements[1] = {
        type = "text",
        content = "Money: $" .. amount
    }
end
```

### 3. Cleanup

Hide UIs when they're no longer needed:

```lua
local function onGameEnd()
    ui:Hide()
end
```

## Complete Example: Shop System

Here's a complete example of a shop system with dynamic content:

```lua
local shop = CreateUI()

-- Setup inventory data
local items = {
    { name = "Health Potion", price = 100 },
    { name = "Mana Potion", price = 150 },
    { name = "Sword", price = 500 }
}

-- Create shop interface
local function refreshShop()
    local player = GetLocalPlayer()
    local playerMoney = player:GetMoney()

    local elements = {
        {
            type = "text",
            content = "Your Money: $" .. playerMoney,
            size = "large"
        }
    }

    -- Add shop items
    for _, item in ipairs(items) do
        table.insert(elements, {
            type = "container",
            style = "panel",
            elements = {
                {
                    type = "text",
                    content = item.name .. " - $" .. item.price
                },
                {
                    type = "button",
                    text = "Buy",
                    enabled = playerMoney >= item.price,
                    onClick = function()
                        if player:RemoveMoney(item.price) then
                            SendNotification("Purchased " .. item.name)
                            refreshShop()
                        end
                    end
                }
            }
        })
    end

    shop.ui = {
        title = "Town Shop",
        elements = elements
    }
end

-- Initialize and show shop
refreshShop()
shop:Show()
```

## Tips for Complex UIs

<AccordionGroup>
  <Accordion title="Performance">
    - Create UIs once and reuse them
    - Only update parts of the UI that changed
    - Hide UIs instead of destroying them
    - Be mindful of the number of elements
  </Accordion>

  <Accordion title="User Experience">
    - Provide feedback for all user actions
    - Keep interfaces consistent
    - Make sure text is readable
    - Add appropriate spacing between elements
    - Use clear and concise labels
  </Accordion>

  <Accordion title="Code Organization">
    - Split complex UIs into functions
    - Keep UI logic separate from game logic
    - Comment your code
    - Use meaningful variable names
  </Accordion>
</AccordionGroup>

## Next Steps

<CardGroup cols={2}>
  <Card
    title="Join Discord"
    icon="discord"
    href="https://discord.com/invite/pAnfNNqg4c"
  >
    Get help from the modding community
  </Card>
  <Card
    title="Youtube tutorials"
    icon="youtube"
    href="https://www.youtube.com/@VictorsAdventure"
  >
    Check out more examples with my video tutorials
  </Card>
</CardGroup>
```

## File: introduction.mdx

```mdx
---
title: Introduction
description: 'Welcome to the documentation for the Poly Plaza Toolkit'
---

Here you'll learn how to use the Poly Plaza Toolkit to create custom mods and enhance your game experience.

## What is the Poly Plaza Toolkit?

The Poly Plaza Toolkit is a powerful modding framework that allows you to create custom content for Poly Plaza using Lua scripting. With it, you can create new gameplay elements, customize the UI, and add exciting features to enhance your gaming experience.

<CardGroup cols={2}>
  <Card
    title="Get started"
    icon="pen-to-square"
    href="/quickstart"
  >
    Create your first Poly Plaza mod and learn the basics of the toolkit.
  </Card>
  <Card
    title="Join the community"
    icon="discord"
    href="https://discord.gg/fuGSrbb3wP"
  >
    Join our discord server to get help and meet other Poly Plaza modders.
  </Card>
</CardGroup>
```

## File: lua_scripting.mdx

```mdx
---
title: 'Lua Scripting'
description: 'Learn how to create scripts for Poly Plaza using Lua'
---

<Info>
  **Prerequisite** Basic understanding of Lua programming language is recommended.
</Info>

## Getting Started

Poly Plaza includes a robust Lua scripting system that allows you to create mods and extend game functionality. This guide covers the core functions and features available to Lua scripts.

<CardGroup cols={2}>
  <Card
    title="Global Functions"
    icon="code"
    href="#global-functions"
  >
    Learn about the core functions available in all scripts
  </Card>
  <Card
    title="Character System"
    icon="user"
    href="#character-system"
  >
    Spawn and control characters
  </Card>
  <Card
    title="UI System"
    icon="window"
    href="#ui-system"
  >
    Create custom user interfaces
  </Card>
  <Card
    title="Steam Integration"
    icon="steam"
    href="#steam-integration"
  >
    Access Steam features
  </Card>
</CardGroup>

## Global Functions

### Core Functions

```lua
-- Send a notification to the player
SendNotification("Hello World!")

-- Quit the game
Quit()

-- Resume from pause
Resume()

-- Respawn the player
Respawn()

-- Save the game
SaveGame()

-- Open settings menu
OpenSettings()
```

## Character System

Spawn and control characters in the game world:

<CodeGroup>

```lua Spawning
-- Spawn a character at coordinates
local character = SpawnCharacter({
    x = 100,
    y = 200,
    z = 50
})
```

```lua Movement
-- Move character to location
character:MoveTo({
    x = 150,
    y = 250,
    z = 50
})

-- Make character look at position
character:LookAt({
    x = 200,
    y = 200,
    z = 50
})
```

```lua Interactions
-- Add primary interaction (E key by default)
character:BindPrimaryInteraction(function()
    print("Primary interaction triggered")
end)

-- Add secondary interaction (F key by default)
character:BindSecondaryInteraction(function()
    print("Secondary interaction triggered")
end)

-- Remove all interactions
character:UnbindInteractions()
```

```lua Equipment
-- Equip clothing on character
character:EquipCloth({
    itemClass = "BP_Shirt_01"
})
```

</CodeGroup>

## Player Functions

Access and modify player data:

```lua
-- Get reference to local player
local player = GetLocalPlayer()

-- Money management
local money = player:GetMoney()
player:AddMoney(100)
player:RemoveMoney(50)

-- Experience system
local exp = player:GetExp()
player:AddExp(100)
local level = player:GetLevel()

-- Inventory management
local inventory = player:GetInventory()
local weight = inventory:GetWeight()
local maxWeight = inventory:GetMaxWeight()
```

## UI System

Create and manage custom UI elements:

```lua
-- Create a new UI instance
local ui = CreateUI()

-- Configure the UI
ui.ui = {
    title = "My Custom Window",
    elements = {
        { type = "text", content = "Hello World" }
    }
}

-- Show/hide the UI
ui:Show()
ui:Hide()
```

## Steam Integration

Access Steam platform features:

```lua
-- Get Steam API instance
local steam = GetSteamAPI()

-- Get user information
local steamId = steam:GetId()
local username = steam:GetUsername()

-- Check DLC ownership
local hasDLC = steam:DoesOwnDLC("dlc_name")
```

## Best Practices

<Tip>
  Always check if objects exist before calling their methods to avoid errors.
</Tip>

```lua
local character = SpawnCharacter({x = 0, y = 0, z = 0})
if character then
    character:MoveTo({x = 100, y = 100, z = 0})
end
```

## Example Script

Here's a complete example showing various features:

```lua
-- Create a character that opens a UI when interacted with
local npc = SpawnCharacter({
    x = 100,
    y = 100,
    z = 0
})

-- Create UI
local ui = CreateUI()
ui.ui = {
    title = "NPC Dialog",
    elements = {
        { type = "text", content = "Would you like to trade?" }
    }
}

-- Add interaction
npc:BindPrimaryInteraction(function()
    ui:Show()
end)

-- Get player reference
local player = GetLocalPlayer()

-- Send welcome message
SendNotification("Welcome " .. GetSteamAPI():GetUsername())
```

## Next Steps

<CardGroup cols={2}>
  <Card
    title="Join Discord"
    icon="discord"
    href="https://discord.com/invite/pAnfNNqg4c"
  >
    Get help from the modding community
  </Card>
  <Card
    title="Youtube tutorials"
    icon="youtube"
    href="https://www.youtube.com/@VictorsAdventure"
  >
    Check out more examples with my video tutorials
  </Card>
</CardGroup>
```

## File: mint.json

```json
{
  "$schema": "https://mintlify.com/schema.json",
  "name": "Poly Plaza Toolkit",
  "logo": {
    "dark": "/logo/vgv_toolkit_logo_dark.svg",
    "light": "/logo/vgv_toolkit_logo_light.svg"
  },
  "favicon": "/favicon.svg",
  "colors": {
    "primary": "#0D9373",
    "light": "#07C983",
    "dark": "#0D9373",
    "anchors": {
      "from": "#0D9373",
      "to": "#07C983"
    }
  },
  "topbarLinks": [
    {
      "name": "Support",
      "url": "help@victorgamestudio.com"
    }
  ],
  "topbarCtaButton": {
    "name": "Get Poly Plaza",
    "url": "https://store.steampowered.com/app/2716030/Poly_Plaza/"
  },
  "anchors": [
    {
      "name": "Steam",
      "icon": "steam",
      "url": "https://store.steampowered.com/app/2716030/Poly_Plaza/"
    },
    {
      "name": "Discord",
      "icon": "discord",
      "url": "https://discord.com/invite/pAnfNNqg4c"
    },
    {
      "name": "Youtube",
      "icon": "youtube",
      "url": "https://www.youtube.com/@VictorsAdventure"
    },
    {
      "name": "Twitch",
      "icon": "twitch",
      "url": "https://www.twitch.tv/victorsgameventure"
    },
    {
      "name": "Reddit",
      "icon": "reddit",
      "url": "https://www.reddit.com/r/PolyPlaza/"
    }
  ],
  "navigation": [
    {
      "group": "Get Started",
      "pages": [
        "introduction",
        "quickstart",
        "lua_scripting"
      ]
    },
    {
      "group": "Scripting Reference",
      "pages": [
        "functions/ui",
        "objects/actor",
        "objects/character"
      ]
    }
  ],
  "footerSocials": {
    "discord": "https://discord.com/invite/pAnfNNqg4c",
    "youtube": "https://www.youtube.com/@VictorsAdventure",
    "website" : "https://www.reddit.com/r/PolyPlaza/"
  }
}
```

## File: objects\actor.mdx

```mdx
---
title: The Actors Playbook
description: Learn how to direct every object in your Poly Plaza world
icon: gamepad
---

# Introduction

The Actor system is what brings your Poly Plaza world to life! Every object in the game - from characters to buildings to items - is an Actor. This guide will show you how to control them.

## Core Methods

### Basic Information

#### GetName()
Returns the name of the Actor.

```lua
local name = actor:GetName()
print("Actor name:", name)
```

#### GetClassName()
Returns the class type of the Actor.

```lua
local className = actor:GetClassName()
print("Actor type:", className)
```

### Location & Movement

#### GetLocation()
Returns the Actor's current position in the world.

```lua
local pos = actor:GetLocation()
print("Position:", pos.x, pos.y, pos.z)
```

#### SetLocation(position)
Moves the Actor to a new position.

```lua
actor:SetLocation({
    x = 100,
    y = 200,
    z = 50
})
```

### Rotation Control

#### GetRotation()
Gets the Actor's current rotation.

```lua
local rot = actor:GetRotation()
print("Rotation - Pitch:", rot.pitch, "Yaw:", rot.yaw, "Roll:", rot.roll)
```

#### SetRotation(rotation)
Sets the Actor's rotation.

```lua
actor:SetRotation({
    pitch = 0,  -- Up/down angle
    yaw = 90,   -- Left/right angle
    roll = 0    -- Barrel roll
})
```

### Scale & Size

#### GetScale()
Returns the Actor's current scale.

```lua
local scale = actor:GetScale()
print("Scale:", scale.x, scale.y, scale.z)
```

### Physics Controls

#### SetPhysicsEnabled(enable)
Enables or disables physics simulation.

```lua
-- Turn on physics
actor:SetPhysicsEnabled(true)

-- Turn off physics
actor:SetPhysicsEnabled(false)
```

#### GetPhysicsEnabled()
Checks if physics is enabled.

```lua
local hasPhysics = actor:GetPhysicsEnabled()
print("Physics enabled:", hasPhysics)
```

#### SetCollisionEnabled(enable)
Enables or disables collision detection.

```lua
-- Turn on collisions
actor:SetCollisionEnabled(true)

-- Turn off collisions
actor:SetCollisionEnabled(false)
```

#### GetCollisionEnabled()
Checks if collision is enabled.

```lua
local hasCollision = actor:GetCollisionEnabled()
print("Collision enabled:", hasCollision)
```

### Physics Properties

#### GetMass()
Gets the Actor's mass in kilograms.

```lua
local mass = actor:GetMass()
print("Mass:", mass, "kg")
```

#### SetMass(mass)
Sets the Actor's mass.

```lua
actor:SetMass(50) -- Set to 50 kg
```

#### GetGravity()
Checks if gravity affects this Actor.

```lua
local hasGravity = actor:GetGravity()
print("Gravity enabled:", hasGravity)
```

#### SetGravity(enable)
Enables or disables gravity for this Actor.

```lua
-- Make the actor float
actor:SetGravity(false)

-- Return to normal gravity
actor:SetGravity(true)
```

### Physics Forces

#### AddImpulse(force)
Applies an instant force to the Actor.

```lua
-- Launch upward
actor:AddImpulse({
    x = 0,
    y = 0,
    z = 1000
})
```

#### GetVelocity()
Gets the Actor's current velocity.

```lua
local velocity = actor:GetVelocity()
print("Speed - X:", velocity.x, "Y:", velocity.y, "Z:", velocity.z)
```

### Actor Lifecycle

#### Destroy()
Removes the Actor from the world.

```lua
actor:Destroy()
```

## Advanced Examples

### Creating a Physics Playground

```lua
local function setupPhysicsActor(actor)
    -- Enable physics and collision
    actor:SetPhysicsEnabled(true)
    actor:SetCollisionEnabled(true)

    -- Set physical properties
    actor:SetMass(10)
    actor:SetGravity(true)

    -- Position the actor
    actor:SetLocation({
        x = 0,
        y = 0,
        z = 100
    })
end
```

### Creating a Floating Display Item

```lua
local function makeFloatingDisplay(actor)
    -- Disable physics interference
    actor:SetPhysicsEnabled(false)
    actor:SetGravity(false)

    -- Set initial position
    actor:SetLocation({
        x = 100,
        y = 100,
        z = 150
    })

    -- Set display rotation
    actor:SetRotation({
        pitch = 0,
        yaw = 45,
        roll = 0
    })
end
```

## Best Practices

<Note>
Always check if your actor still exists before calling methods on it:
```lua
if actor then
    actor:SetLocation(newPosition)
end
```
</Note>

<Warning>
Be careful with physics forces! Start with small values and adjust as needed.
</Warning>

<Tip>
When working with multiple actors, consider disabling physics and collision for actors that don't need them to improve performance.
</Tip>

## Troubleshooting

### Common Issues

1. **Actor not moving with AddImpulse**
   - Check if physics is enabled
   - Verify the mass isn't too high
   - Make sure gravity is appropriate for your needs

2. **Collision not working**
   - Confirm collision is enabled
   - Check if physics is enabled
   - Verify the actor has a valid collision shape

3. **Actor disappearing**
   - Make sure the location is within valid world bounds
   - Check if it was accidentally destroyed
   - Verify it hasn't fallen through the world (check Z position)

### Example Debug Function

```lua
local function debugActor(actor)
    if not actor then
        print("Actor is nil!")
        return
    end

    local pos = actor:GetLocation()
    local rot = actor:GetRotation()
    local physics = actor:GetPhysicsEnabled()
    local collision = actor:GetCollisionEnabled()

    print("--- Actor Debug Info ---")
    print("Name:", actor:GetName())
    print("Class:", actor:GetClassName())
    print("Position:", pos.x, pos.y, pos.z)
    print("Rotation:", rot.pitch, rot.yaw, rot.roll)
    print("Physics:", physics)
    print("Collision:", collision)
    print("Mass:", actor:GetMass())
    print("Has Gravity:", actor:GetGravity())
end
```

Remember, actors are the building blocks of your Poly Plaza world. Use them wisely, and don't forget to share your creations with the community!
```

## File: objects\character.mdx

```mdx
---
title: Character System
description: Master the complete character system in Poly Plaza
icon: user
---

# Character System

Characters in Poly Plaza are powerful entities that combine core Actor functionality with advanced features like customization, inventory, quests, jobs and more. They serve as the backbone for both players and NPCs.

## Base Features

Since Characters inherit from Actors, they have access to all [Actor features](/objects/actor) including:
- Location & movement control
- Rotation & scaling
- Physics & collision
- Mass & gravity controls

## Creating Characters

### SpawnCharacter
Creates a new character at the specified location.

```lua
-- Create a new character
local npc = SpawnCharacter({
    x = -10409,
    y = -19816,
    z = 126
})
```

## Movement & Vision

### MoveTo
Makes the character walk to a specific location using pathfinding.

```lua
npc:MoveTo({
    x = -10500,
    y = -19900,
    z = 126
})
```

### LookAt
Makes the character turn to face a specific point.

```lua
npc:LookAt({
    x = -10500,
    y = -19900,
    z = 126
})
```

## Interaction System

### Setting Up Interactions

Characters have a built-in interaction system with interaction zones:

```lua
-- Primary interaction (usually E key)
npc:BindPrimaryInteraction(function()
    print("Hello!")
    -- Show dialog, open shop, etc.
end)

-- Secondary interaction (usually F key)
npc:BindSecondaryInteraction(function()
    print("Additional options...")
    -- Show additional menu, etc.
end)

-- Remove interactions when needed
npc:UnbindInteractions()
```

## Customization

### EquipCloth
Customize character appearance with different clothing items:

```lua
npc:EquipCloth({
    itemClass = "BP_Shirt_01",  -- Reference to the clothing item
})
```

## Example: Creating a Shop NPC

Here's a complete example of creating a merchant NPC:

```lua
-- Create our friendly merchant
local merchant = SpawnCharacter({
    x = -10409,
    y = -19816,
    z = 126
})

-- Dress them appropriately
merchant:EquipCloth({
    itemClass = "BP_MerchantOutfit_01"
})

-- Set up their shop interaction
merchant:BindPrimaryInteraction(function()
    print("Welcome to my shop!")
    -- Show shop menu here
end)

-- Set up info interaction
merchant:BindSecondaryInteraction(function()
    print("We've got the best prices in town!")
end)
```

## Example: Creating a Wandering NPC

```lua
local function createWanderer()
    -- Spawn our wandering NPC
    local npc = SpawnCharacter({
        x = -10409,
        y = -19816,
        z = 126
    })

    -- Give them casual clothes
    npc:EquipCloth({
        itemClass = "BP_CasualOutfit_01"
    })

    -- Let them chat with players
    npc:BindPrimaryInteraction(function()
        print("Beautiful day for a walk!")
    end)

    -- Make them wander
    local function wander()
        npc:MoveTo({
            x = -10409 + math.random(-100, 100),
            y = -19816 + math.random(-100, 100),
            z = 126
        })
    end

    return npc
end
```

## Best Practices

<Note>
When spawning characters, ensure the Z coordinate is slightly above ground level to prevent clipping.
</Note>

<Warning>
Keep track of your NPCs - too many characters with active AI and pathfinding can impact performance.
</Warning>

<Tip>
Use interaction bindings to create immersive NPCs that respond to player actions in meaningful ways.
</Tip>

## Troubleshooting

### Common Issues

1. **Character not spawning**
   - Check if the spawn coordinates are valid
   - Ensure the location isn't obstructed
   - Verify the Z height is appropriate

2. **Character not moving**
   - Verify the destination is reachable
   - Check if pathfinding is possible to that location
   - Make sure the character isn't blocked

3. **Interactions not working**
   - Verify the interaction functions are properly bound
   - Check if the player is in range
   - Ensure the interaction zone isn't blocked

### Debug Helper

```lua
local function debugCharacter(char)
    if not char then
        print("Character is nil!")
        return
    end

    local pos = char:GetLocation()
    print("--- Character Debug Info ---")
    print(string.format("Position: %.2f, %.2f, %.2f",
        pos.x, pos.y, pos.z))
    print("Has Primary Interaction:", char._hasPrimaryInteraction)
    print("Has Secondary Interaction:", char._hasSecondaryInteraction)
end
```

Remember, characters are what bring your Poly Plaza world to life! Use them to create vibrant, interactive environments that players will love to explore.
```

## File: objects\roleplay_character.mdx

```mdx
---
title: 'Role Play Character'
description: 'Interact with player characters using the Role Play Character object in Lua scripting'
icon: 'user'
---

# Role Play Character Object

The `RolePlayCharacter` object allows you to interact with player characters in the game world. This guide provides a comprehensive overview of how to use this object in Lua scripting to manage aspects like money, experience points, levels, and inventory.

## Getting Started

To use the `RolePlayCharacter` object, you need to obtain a reference to it. This typically involves game-specific methods such as player initialization or event callbacks that provide access to the character.

**Example:**

```lua
-- Assume 'RolePlayCharacter' is a valid reference to a player character
```

Once you have a reference, you can utilize the methods described below to interact with the character.

---

## Methods

### GetMoney()

**Description:**

Retrieves the amount of money the character currently has.

**Syntax:**

```lua
local money = RolePlayCharacter:GetMoney()
```

**Returns:**

- `money`: An integer representing the character's current money balance.

**Example:**

```lua
local money = RolePlayCharacter:GetMoney()
print("Current Money:", money)
```

---

### AddMoney(amount)

**Description:**

Adds a specified amount of money to the character's balance.

**Syntax:**

```lua
local success = RolePlayCharacter:AddMoney(amount)
```

**Parameters:**

- `amount`: An integer specifying how much money to add.

**Returns:**

- `success`: A boolean value indicating whether the operation was successful.

**Example:**

```lua
-- Add 500 units of money to the character
local success = RolePlayCharacter:AddMoney(500)
if success then
    print("Money added successfully!")
else
    print("Failed to add money.")
end
```

---

### RemoveMoney(amount)

**Description:**

Removes a specified amount of money from the character's balance.

**Syntax:**

```lua
local success = RolePlayCharacter:RemoveMoney(amount)
```

**Parameters:**

- `amount`: An integer specifying how much money to remove.

**Returns:**

- `success`: A boolean value indicating whether the operation was successful.

**Example:**

```lua
-- Remove 200 units of money from the character
local success = RolePlayCharacter:RemoveMoney(200)
if success then
    print("Money removed successfully!")
else
    print("Failed to remove money.")
end
```

---

### GetExp()

**Description:**

Retrieves the character's current experience points (XP).

**Syntax:**

```lua
local experience = RolePlayCharacter:GetExp()
```

**Returns:**

- `experience`: An integer representing the character's current XP.

**Example:**

```lua
local experience = RolePlayCharacter:GetExp()
print("Current Experience Points:", experience)
```

---

### AddExp(amount)

**Description:**

Adds a specified amount of experience points to the character.

**Syntax:**

```lua
local success = RolePlayCharacter:AddExp(amount)
```

**Parameters:**

- `amount`: An integer specifying how much XP to add.

**Returns:**

- `success`: A boolean value indicating whether the operation was successful.

**Example:**

```lua
-- Add 1000 experience points to the character
local success = RolePlayCharacter:AddExp(1000)
if success then
    print("Experience added successfully!")
else
    print("Failed to add experience.")
end
```

---

### GetLevel()

**Description:**

Retrieves the character's current level.

**Syntax:**

```lua
local level = RolePlayCharacter:GetLevel()
```

**Returns:**

- `level`: An integer representing the character's level.

**Example:**

```lua
local level = RolePlayCharacter:GetLevel()
print("Current Level:", level)
```

---

### GetInventory()

**Description:**

Accesses the character's inventory.

**Syntax:**

```lua
local inventory = RolePlayCharacter:GetInventory()
```

**Returns:**

- `inventory`: An `Inventory` object representing the character's inventory.

**Example:**

```lua
local inventory = RolePlayCharacter:GetInventory()
-- Use inventory methods to interact with the inventory
```

---

## Inventory Object Methods

Since `GetInventory()` returns an `Inventory` object, you can use its methods to manage the character's inventory. (Assuming the `Inventory` object provides methods like `AddItem`, `RemoveItem`, `GetItems`, etc.)

**Example:**

```lua
local inventory = RolePlayCharacter:GetInventory()

-- Add an item to the inventory
inventory:AddItem("HealthPotion", 3)

-- Remove an item from the inventory
inventory:RemoveItem("HealthPotion", 1)

-- Get the list of items
local items = inventory:GetItems()
for itemName, quantity in pairs(items) do
    print(itemName, quantity)
end
```

---

## Example Usage

Here's an example that utilizes several of the methods:

```lua
-- Check the character's current money and experience
local money = RolePlayCharacter:GetMoney()
local experience = RolePlayCharacter:GetExp()
local level = RolePlayCharacter:GetLevel()

print("Money:", money)
print("Experience:", experience)
print("Level:", level)

-- Add money and experience to the character
RolePlayCharacter:AddMoney(1000)
RolePlayCharacter:AddExp(500)

-- Remove some money
RolePlayCharacter:RemoveMoney(200)

-- Access and interact with the inventory
local inventory = RolePlayCharacter:GetInventory()
inventory:AddItem("Sword", 1)
inventory:AddItem("Shield", 1)

-- Display updated stats
money = RolePlayCharacter:GetMoney()
experience = RolePlayCharacter:GetExp()
print("Updated Money:", money)
print("Updated Experience:", experience)
```

---

## Notes

- Ensure that you have a valid `RolePlayCharacter` reference to avoid runtime errors.
- When adding or removing money and experience, consider implementing checks to prevent negative balances or exceeding maximum limits.
- The `Inventory` object methods depend on how the inventory system is implemented in your game.

## Troubleshooting

- **Operation Failed**: If `AddMoney`, `RemoveMoney`, or `AddExp` return `false`, ensure that the character's wallet or leveling components are properly initialized.
- **Invalid Inventory**: If `GetInventory()` returns `nil`, check that the character's inventory component is correctly set up.

## Conclusion

The `RolePlayCharacter` object provides essential methods for managing player characters in your game. By leveraging these methods in Lua scripting, you can create rich gameplay experiences involving character progression, currency systems, and inventory management.

Experiment with these methods to enhance your game's interactivity and depth.
```

## File: poly-plaza\introduction.mdx

```mdx
---
title: 'Introduction'
description: 'Learn how to create scripts on Poly Plaza'
---

<Note>
  Poly Plaza modding is based on the Victor Game Studio - **Toolkit**, so before continuing please read the [quickstart guide](/quickstart) for the VGS **Toolkit**.
</Note>

## Welcome

There are two ways to build API documentation: [OpenAPI](https://mintlify.com/docs/api-playground/openapi/setup) and [MDX components](https://mintlify.com/docs/api-playground/mdx/configuration). For the starter kit, we are using the following OpenAPI specification.

<Card
  title="Plant Store Endpoints"
  icon="leaf"
  href="https://github.com/mintlify/starter/blob/main/api-reference/openapi.json"
>
  View the OpenAPI specification file
</Card>

## Authentication

All API endpoints are authenticated using Bearer tokens and picked up from the specification file.

```json
"security": [
  {
    "bearerAuth": []
  }
]
```

```

## File: quickstart.mdx

```mdx
---
title: 'Quickstart'
description: 'Start creating your own Poly Plaza mods in less than 2 minutes!'
---

## Setup your coding environment

To begin creating mods for Poly Plaza, you'll need a script editor that supports Lua. We recommend using [Sublime Text](https://www.sublimetext.com/) or [Visual Studio Code](https://code.visualstudio.com/).

### Locate the Scripts folder

The Scripts folder is located in your Poly Plaza installation directory:

1. Open Steam
2. Right-click on Poly Plaza
3. Select "Properties"
4. Go to "Local Files"
5. Click "Browse Local Files"
6. Open the "Scripts" folder inside of the PolyPlaza folder

### Directory structure

The Scripts folder contains several default Lua files that power the base game. Important notes:

- Be careful when modifying default files as they control core game functionality
- The Scripts folder resets with each game update
- We recommend keeping your mod files in a separate backup location and copying them to the Scripts folder for testing

### Create your first mod

1. Create a new folder inside the Scripts directory
2. Add your Lua files inside this folder
3. Your mod will automatically load when you start Poly Plaza

Example mod structure:
```lua
PolyPlaza/
  └──Scripts/
      └── MyFirstMod/
          ├── init.lua
          └── customFeatures.lua
```

When you launch Poly Plaza, the game will automatically detect and load your mod files.

### Testing your mod

1. Make sure your Lua files are in the Scripts folder
2. Launch Poly Plaza
3. The game will load your mod automatically

<Tip>
  Keep a backup of your mod files outside the Scripts folder to prevent losing your work during game updates.
</Tip>
```

