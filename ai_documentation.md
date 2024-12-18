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
description: 'Interact with the game UI using Lua scripting'
icon: 'display'
---

# Introduction

This guide covers the UI-related functions available for Lua scripting in VGS games. These functions allow you to create custom UI elements and control the game's flow by quitting or resuming the game.

---

## Functions

### CreateUI()

**Description:**

Creates a new UI object that you can use to build and manage custom user interfaces within the game.

**Syntax:**

```lua
local ui = CreateUI()
```

**Returns:**

- `ui`: A `UI` object that provides methods to create UI elements like buttons, text fields, images, etc.

**Example:**

```lua
local ui = CreateUI()

-- Add a button to the UI
ui:AddButton("Click Me", function()
    print("Button was clicked!")
end)
```

---

### SendNotification(message)

**Description:**

Displays a notification message to the player.

**Syntax:**

```lua
SendNotification(message)
```

**Parameters:**

- `message`: A string containing the notification text to display.

**Example:**

```lua
SendNotification("Welcome to the game!")
```

---

### Quit()

**Description:**

Exits the game application. This function is useful for creating exit buttons or handling game over scenarios.

**Syntax:**

```lua
local success = Quit()
```

**Returns:**

- `success`: A boolean value (`true` or `false`) indicating whether the quit operation was successfully initiated.

**Example:**

```lua
-- Quit the game when the player loses all lives
if playerLives <= 0 then
    local success = Quit()
    if success then
        print("Game is quitting...")
    else
        print("Failed to quit the game.")
    end
end
```

---

### Resume()

**Description:**

Resumes the game if it is paused. This function can be used to close pause menus or resume gameplay after a modal UI is dismissed.

**Syntax:**

```lua
local success = Resume()
```

**Returns:**

- `success`: A boolean value indicating whether the resume operation was successfully triggered.

**Example:**

```lua
-- Resume the game after closing a pause menu
local success = Resume()
if success then
    print("Game has been resumed.")
else
    print("Failed to resume the game.")
end
```

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

## File: mint.json

```json
{
  "$schema": "https://mintlify.com/schema.json",
  "name": "Poly Plaza Toolkit",
  "logo": {
    "dark": "/logo/poly_plaza_logo_dark.svg",
    "light": "/logo/poly_plaza_logo_light.svg"
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
      "url": "mailto:support@polyplaza.com"
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
      "url": "https://discord.gg/fuGSrbb3wP"
    }
  ],
  "navigation": [
    {
      "group": "Get Started",
      "pages": [
        "introduction",
        "quickstart"
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
    "discord": "https://discord.gg/fuGSrbb3wP",
    "website": "https://store.steampowered.com/app/2716030/Poly_Plaza/"
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

