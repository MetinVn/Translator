# Translator

A clean React + Vite translator with multilingual text and voice input.

## What it does

- Translate text between English, Azerbaijani, German, Spanish, Italian, Turkish, and Russian
- Swap source/target languages instantly
- Use browser speech recognition to speak and auto-fill input
- Toggle between light and dark mode
- Show live translation results and recognition feedback

## Run locally

1. `npm install`
2. `npm run dev`

## Project structure

- `src/App.jsx` — main app state and layout
- `src/components/LanguageSelector.jsx` — source/target language controls
- `src/components/InputSection.jsx` — text input and translate action
- `src/components/VoiceTranslate.jsx` — speech input trigger
- `src/components/OutputSection.jsx` — results and live status
- `src/hooks/useTranslation.js` — translation request logic
- `src/services/translationService.js` — API call wrapper
- `src/services/speechRecService.js` — browser speech recognition helper

## Built with

- React
- Vite
- Tailwind CSS
- Axios
- React Query
- Web Speech API

## Notes

- Voice input starts speech recognition in the selected source language.
- The app uses a small character-limited text input for quick translation demos.
