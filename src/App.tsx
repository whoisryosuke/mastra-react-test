import * as React from "react";
import { DefaultChatTransport, type ToolUIPart } from "ai";
import { useChat } from "@ai-sdk/react";
import { css, cx } from "styled-system/css";

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
import { Box } from "styled-system/jsx";
import DebugPanel from "./components/debug/DebugPanel";

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

const toolHeaderStyles = css({
  cursor: "pointer",
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
      api: "http://localhost:4111/chat/weather-agent",
    }),
  });

  const handleSubmit = async () => {
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput("");
  };

  return (
    <>
      <Box bg="gray.1" className={cx(appContainer)}>
        <Box className={conversationContainer}>
          <Conversation className={css({ height: "full" })}>
            <ConversationContent>
              {messages.map((message) => (
                <Box key={message.id}>
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
                        <Tool key={`${message.id}-${i}`}>
                          <ToolHeader
                            type={(part as ToolUIPart).type}
                            state={
                              (part as ToolUIPart).state || "output-available"
                            }
                            className={toolHeaderStyles}
                          />
                          <ToolContent>
                            <ToolInput
                              input={(part as ToolUIPart).input || {}}
                            />
                            <ToolOutput
                              output={(part as ToolUIPart).output}
                              errorText={(part as ToolUIPart).errorText}
                            />
                          </ToolContent>
                        </Tool>
                      );
                    }

                    return null;
                  })}
                </Box>
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
                placeholder="Ask about the weather..."
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
