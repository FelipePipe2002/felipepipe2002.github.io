# Dungeon & Dragons Campaign Manager

A **full-stack platform for running and organizing tabletop RPG campaigns**, built to keep world information, encounters, maps, and game-master tools in one place.

## Links

- [Source code](https://github.com/FelipePipe2002/DungeonAndDragons)

## Main Features

- **Interactive World Map**: Browse, edit, pan, and zoom through campaign landmarks
- **Tactical Battle Board**: Manage initiative, tokens, props, fog of war, and player presentation
- **Campaign Knowledge Base**: Organize characters, organizations, buildings, monsters, spells, items, and rules
- **Game Master Workspace**: Track notes, open story threads, events, relationships, and party inventory
- **Dungeon Tools**: Create, edit, render, and version JSON-based dungeon maps
- **Authentication**: Secure cookie-based JWT login with a single-owner registration model

## Technical Implementation

The frontend uses **Next.js 16**, **React 19**, and **TypeScript**, while a **Java 21 Spring Boot** backend exposes authenticated REST APIs backed by **PostgreSQL**. The relational domain and schema evolution are managed with **Flyway migrations**.

## Architecture Highlights

- Next.js server and client components
- Spring Boot layered API with validation and consistent errors
- Shared battle and presentation state for game-master and player screens
- Versioned JSON contract for custom dungeon maps
- Automated frontend and backend tests

## Technologies

`Next.js` `React` `TypeScript` `Java` `Spring Boot` `PostgreSQL` `Flyway` `JWT` `Tailwind CSS`
