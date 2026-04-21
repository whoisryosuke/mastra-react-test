# Tailwind to PandaCSS Migration Plan

**Goal**: Convert 48 components from Tailwind classes to PandaCSS `defineRecipe()` or `defineSlotRecipe()` calls. Also, swap the old shadcn components for Park UI components inside `src/components/ui/` folder.

## Rules

- Import Park UI components from `src/components/ui` and replace with any matching shadcn UI components (e.g. if you find an `Accordion` in conversion file, try to find matching component in `src/components/ui`).
- Import `defineRecipe` from `import { defineRecipe } from '@pandacss/dev'`.
- Place recipe files inside `src\theme\recipes`.
- Convert Tailwind classes to Panda object syntax (e.g., `px-4` -> `paddingX: '4'`)
- Prefer Ark UI or Park UI component style props (like `<Button colorPallette="blue">`) if possible over creating PandaCSS styles.
- Preserve all existing component logic and props.
- Run `npm run lint` after each conversion.

## Component Checklist

- [ ] src/components/ai-elements/agent.tsx
- [ ] src/components/ai-elements/artifact.tsx
- [ ] src/components/ai-elements/attachments.tsx
- [ ] src/components/ai-elements/audio-player.tsx
- [ ] src/components/ai-elements/canvas.tsx
- [ ] src/components/ai-elements/chain-of-thought.tsx
- [ ] src/components/ai-elements/checkpoint.tsx
- [ ] src/components/ai-elements/code-block.tsx
- [ ] src/components/ai-elements/commit.tsx
- [ ] src/components/ai-elements/confirmation.tsx
- [ ] src/components/ai-elements/connection.tsx
- [ ] src/components/ai-elements/context.tsx
- [ ] src/components/ai-elements/controls.tsx
- [ ] src/components/ai-elements/conversation.tsx
- [ ] src/components/ai-elements/edge.tsx
- [ ] src/components/ai-elements/environment-variables.tsx
- [ ] src/components/ai-elements/file-tree.tsx
- [ ] src/components/ai-elements/image.tsx
- [ ] src/components/ai-elements/inline-citation.tsx
- [ ] src/components/ai-elements/jsx-preview.tsx
- [ ] src/components/ai-elements/message.tsx
- [ ] src/components/ai-elements/mic-selector.tsx
- [ ] src/components/ai-elements/model-selector.tsx
- [ ] src/components/ai-elements/node.tsx
- [ ] src/components/ai-elements/open-in-chat.tsx
- [ ] src/components/ai-elements/package-info.tsx
- [ ] src/components/ai-elements/panel.tsx
- [ ] src/components/ai-elements/persona.tsx
- [ ] src/components/ai-elements/plan.tsx
- [ ] src/components/ai-elements/prompt-input.tsx
- [ ] src/components/ai-elements/queue.tsx
- [ ] src/components/ai-elements/reasoning.tsx
- [ ] src/components/ai-elements/sandbox.tsx
- [ ] src/components/ai-elements/schema-display.tsx
- [ ] src/components/ai-elements/shimmer.tsx
- [ ] src/components/ai-elements/snippet.tsx
- [ ] src/components/ai-elements/sources.tsx
- [ ] src/components/ai-elements/speech-input.tsx
- [ ] src/components/ai-elements/stack-trace.tsx
- [ ] src/components/ai-elements/suggestion.tsx
- [ ] src/components/ai-elements/task.tsx
- [ ] src/components/ai-elements/terminal.tsx
- [ ] src/components/ai-elements/test-results.tsx
- [ ] src/components/ai-elements/tool.tsx
- [ ] src/components/ai-elements/toolbar.tsx
- [ ] src/components/ai-elements/transcription.tsx
- [ ] src/components/ai-elements/voice-selector.tsx
- [ ] src/components/ai-elements/web-preview.tsx
