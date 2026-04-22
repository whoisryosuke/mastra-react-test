# Tailwind to PandaCSS Migration Plan

**Goal**: Convert 48 components from Tailwind classes to PandaCSS `css()` or `defineRecipe()` calls. Also, swap the old shadcn components for Park UI components inside `src/components/ui/` folder.

## Rules

- Import Park UI components from `src/components/ui` and replace with any matching shadcn UI components (e.g. if you find an `Accordion` in conversion file, try to find matching component in `src/components/ui`).
- Import `css` from `../styled-system/css`.
- Place recipe files inside `src\theme\recipes`.
- Convert Tailwind classes to Panda object syntax (e.g., `px-4` -> `paddingX: '4'`)
- Prefer Ark UI or Park UI component style props (like `<Button colorPallette="blue">`) if possible over creating PandaCSS styles.
- Preserve all existing component logic and props.
- Run `npm run lint` after each conversion.

## Component Checklist

- [x] src/components/ai-elements/agent.tsx
- [x] src/components/ai-elements/artifact.tsx
- [x] src/components/ai-elements/attachments.tsx
- [x] src/components/ai-elements/audio-player.tsx
- [x] src/components/ai-elements/canvas.tsx
- [x] src/components/ai-elements/chain-of-thought.tsx
- [x] src/components/ai-elements/checkpoint.tsx
- [x] src/components/ai-elements/code-block.tsx
- [x] src/components/ai-elements/commit.tsx
- [x] src/components/ai-elements/confirmation.tsx
- [x] src/components/ai-elements/connection.tsx
- [x] src/components/ai-elements/context.tsx
- [x] src/components/ai-elements/controls.tsx
- [x] src/components/ai-elements/conversation.tsx
- [x] src/components/ai-elements/edge.tsx
- [x] src/components/ai-elements/environment-variables.tsx
- [x] src/components/ai-elements/file-tree.tsx
- [x] src/components/ai-elements/image.tsx
- [x] src/components/ai-elements/inline-citation.tsx
- [x] src/components/ai-elements/jsx-preview.tsx
- [x] src/components/ai-elements/message.tsx
- [x] src/components/ai-elements/mic-selector.tsx
- [x] src/components/ai-elements/model-selector.tsx
- [x] src/components/ai-elements/node.tsx
- [x] src/components/ai-elements/open-in-chat.tsx
- [x] src/components/ai-elements/package-info.tsx
- [x] src/components/ai-elements/panel.tsx
- [x] src/components/ai-elements/persona.tsx
- [x] src/components/ai-elements/plan.tsx
- [ ] src/components/ai-elements/prompt-input.tsx
- [x] src/components/ai-elements/queue.tsx
- [x] src/components/ai-elements/reasoning.tsx
- [x] src/components/ai-elements/sandbox.tsx
- [x] src/components/ai-elements/schema-display.tsx
- [x] src/components/ai-elements/shimmer.tsx
- [x] src/components/ai-elements/snippet.tsx
- [x] src/components/ai-elements/sources.tsx
- [x] src/components/ai-elements/speech-input.tsx
- [x] src/components/ai-elements/stack-trace.tsx
- [x] src/components/ai-elements/suggestion.tsx
- [x] src/components/ai-elements/task.tsx
- [x] src/components/ai-elements/terminal.tsx
- [x] src/components/ai-elements/test-results.tsx
- [x] src/components/ai-elements/tool.tsx
- [x] src/components/ai-elements/toolbar.tsx
- [x] src/components/ai-elements/transcription.tsx
- [x] src/components/ai-elements/voice-selector.tsx
- [x] src/components/ai-elements/web-preview.tsx
