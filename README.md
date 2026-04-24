# Music Agent using Mastra

This is a music generation agent that can generate MIDI notes for user. The app displays the MIDI notes as piano roll.

There's also a music theory agent that can teach about music concepts, and has special tools for visualizing music information.

## Requirements

- Mastra Server app
- Local or cloud LLM

I used LM Studio locally with Qwen Coder 30B model (works well with tools).

## Development

1. Spin up local LLM server if needed.
1. Spin up server app.
1. Install deps: `yarn`
1. Spin up this app: `yarn dev`

Chat should be available at http://localhost:5173/

## How to use

Just ask anything like "C minor piano melody" and it will use the `musicGenerationTool` (see server for details) to provide user with MIDI data in a JSON format. This app gets that JSON data and visualizes it in a piano roll using the `<MusicGenerationTool />`

> The "music generation" happens in your LLM model - there's nothing happening on the server or client, we just take JSON data the LLM provides and show it to user. So the quality of the music generation will vary based on the model you pick, and any influence you give it (like providing reference material).

### Music Theory Agent

There's also a music theory agent available. You can access this by changing the chat URL in the `useChat` hook in `App.tsx`.

```
http://localhost:4111/chat/music-theory-agent
```
