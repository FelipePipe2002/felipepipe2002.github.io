# Pac-Man Console Game

A C++20 console-based arcade game inspired by the classic Pac-Man gameplay loop. The project implements a playable grid-based game with real-time keyboard input, animated terminal rendering, collectible points, power pellets, fruit bonuses, portals, multiple maps, and ghost AI behavior driven by interchangeable movement strategies.

## Links

* Repository: private due to internship project constraints

## Overview

The game loads map definitions from JSON files, allowing different board layouts, wall placement, spawn points, portals, ghost configurations, scatter targets, and map colors to be customized without changing the core game code.

Gameplay includes scoring, win/loss detection, frightened ghost mode, ghost-eaten recovery behavior, and replay flow.

## Key Features

* Real-time Pac-Man movement with direction buffering
* Multiple selectable maps loaded from the `maps/` directory
* JSON-driven map system with walls, points, player spawn, ghost home, portals, and scatter points
* Ghost state machine with Chase, Scatter, Frightened, and Eaten modes
* Strategy-pattern ghost AI for direct chase, predictive targeting, distance-based behavior, portal-aware movement, frightened random movement, and return-to-home recovery
* Portal teleportation system for player and ghost movement
* Score system with points, pellets, fruits, and ghost-eating multipliers
* Fruit bonus spawning based on map completion percentage
* Animated start screen, map selector, win/lose screen, and replay option
* Colored terminal rendering using emojis for Pac-Man, ghosts, fruit, pellets, and walls

## Architecture

The project is organized around clear gameplay modules:

* **Board** manages the map grid, enabled tiles, collectibles, portals, scatter points, and spawn positions.
* **GameLogic** controls the main game rules, scoring, ghost state transitions, win/loss checks, and map loading.
* **Entity** provides the base movement interface for Player and Ghost.
* **MovementStrategy** separates ghost AI behavior from the ghost entity, making new ghost behaviors easier to add.
* **Renderer** handles terminal UI, grid drawing, score display, animations, and menu screens.
* **InputManager** abstracts keyboard input for gameplay and menus.
* **JSON map files** allow new levels to be created without modifying the engine code.

## Technology Stack

`C++20` `CMake` `Windows Console API` `GetAsyncKeyState` `ANSI colors` `UTF-8 terminal rendering` `JSON` `nlohmann/json` `clang-tidy` `clang-format` `GoogleTest` `Google Benchmark`

## Tooling and Dependencies

The project uses CMake 3.18+ and includes support for dependencies pulled through CMake FetchContent, including jngl, SDL2, Freetype, Ogg/Vorbis, and WebP-related dependencies.

It also includes clang-tidy and clang-format configuration. CMake support for GoogleTest and Google Benchmark is configured, although no test files are currently present.

## Result

The result is a modular console game that combines classic arcade mechanics with configurable JSON maps, real-time terminal rendering, and extensible ghost behavior through strategy-pattern AI.
