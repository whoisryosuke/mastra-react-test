import * as React from "react";
import { DefaultChatTransport, type ToolUIPart } from "ai";
import { useChat } from "@ai-sdk/react";
import { css, cx } from "styled-system/css";
// Supports weights 100-900
import "@fontsource-variable/inter-tight/wght.css";

import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { Box, Stack } from "styled-system/jsx";
import DebugPanel from "./components/debug/DebugPanel";
import ToolView from "./components/chat/Tools/ToolView";

const appContainer = css({
  position: "relative",
  marginX: "auto",
  width: "full",
  height: "screen",
  maxWidth: "4xl",
  padding: "6",
});

const conversationContainer = css({
  display: "flex",
  flexDirection: "column",
  height: "full",
});

const promptInputStyles = css({
  marginTop: "2",
});

const textareaStyles = css({
  lineHeight: { base: "normal" },
});

export default function App() {
  const [input, setInput] = React.useState<string>("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:4111/chat/music-theory-agent",
    }),
  });

  const handleSubmit = async () => {
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput("");
  };

  console.log("messages", messages);

  return (
    <>
      <Box bg="gray.1" className={cx(appContainer)}>
        <Box className={conversationContainer}>
          <Conversation className={css({ height: "full" })}>
            <ConversationContent>
              {messages.map((message) => (
                <Stack key={message.id} gap="3">
                  {message.parts?.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <Message key={`${message.id}-${i}`} from={message.role}>
                          <MessageContent>
                            <MessageResponse>{part.text}</MessageResponse>
                          </MessageContent>
                        </Message>
                      );
                    }

                    if (part.type?.startsWith("tool-")) {
                      return (
                        <ToolView
                          content={part as ToolUIPart}
                          id={message.id}
                          index={i}
                        />
                      );
                    }

                    return null;
                  })}
                </Stack>
              ))}
              <ConversationScrollButton />
            </ConversationContent>
          </Conversation>
          <PromptInput onSubmit={handleSubmit} className={promptInputStyles}>
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                className={textareaStyles}
                value={input}
                placeholder="Ask about music..."
                disabled={status !== "ready"}
              />
            </PromptInputBody>
          </PromptInput>
        </Box>
      </Box>

      <DebugPanel />
    </>
  );
}
