import React, { useState } from "react";
import type { ToolItemProps } from "./types";
import { Accordion, Badge, Button, Heading, Text } from "@/components/ui";
import { Flex, Stack } from "styled-system/jsx";
import PianoKeySimple from "@/components/music/piano/PianoKeySimple";
import { useNotePlayer, type NoteWithOctave } from "@/hooks/useNotePlayer";
import { PlayCircle } from "lucide-react";
import PianoRoll from "@/components/music/PianoRoll";
import type { MidiNote } from "@/types/music";

type Props = ToolItemProps;

const MusicGenerationTool = ({ id, index, content, className }: Props) => {
  const notes = content.output.notes as MidiNote[];
  return (
    <Accordion.Root
      defaultValue={[id]}
      collapsible
      borderRadius="l3"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border"
      px="4"
      py="1"
    >
      <Accordion.Item value={id} borderBottom="0">
        <Accordion.ItemTrigger>
          <Heading as="h3">Found chord...</Heading>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            <PianoRoll notes={notes} />
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default MusicGenerationTool;
