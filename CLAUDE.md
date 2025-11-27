# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Thanksgiving-themed party game where one player secretly receives a different question than everyone else. Players answer the question out loud, then vote on who they think had the different (imposter) question.

The questions are meant to be illict similar responses but somewhat likely to cause hilarious reactions. An example is Real Question: "Name a place you would like to visit?" and Fake Question: "Name a country that seems like it is always at war?" Answers could be funny because the imposter may have to say why they would like to visit Iraq or Syria. 

## Commands

```bash
npm run dev     # Start development server (http://localhost:3000)
npm run build   # Production build
npm run start   # Start production server
```

## Architecture

**Stack**: Next.js 14 (Pages Router) + React 18 + Tailwind CSS 3.4

**Structure**:
- `pages/index.js` - Entry point, renders ThanksgivingImposter component
- `pages/_app.js` - App wrapper, imports global styles
- `components/ThanksgivingImposter.jsx` - Single-file game containing all game logic and UI
- `styles/globals.css` - Tailwind directives only

**Game State Machine** (in ThanksgivingImposter.jsx):
```
splash → setup → ready → viewing → waiting → reveal
                   ↑                  ↓
                   └─────── recall ───┘
```

States: `splash` (title screen), `setup` (interviewer enters questions/player count), `ready` (hand phone to player), `viewing` (player sees their question), `waiting` (all players done, interviewer can announce), `recall` (player forgot question), `reveal` (show answer and imposter)

**Key State Variables**:
- `imposterPlayer` - Randomly assigned player number who gets the different question
- `questionHistory` - Session storage of past games for review/export
- `currentPlayer` - Tracks which player is viewing their question

The entire game is client-side with no backend. All state is React useState hooks within the single component.
