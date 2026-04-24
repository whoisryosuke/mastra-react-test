import React, { useState } from "react";
import type { ToolItemProps } from "./types";
import { Accordion, Badge, Button, Heading, Text } from "@/components/ui";
import { Flex, Stack } from "styled-system/jsx";
import PianoKeySimple from "@/components/music/piano/PianoKeySimple";
import { useNotePlayer, type NoteWithOctave } from "@/hooks/useNotePlayer";
import { DownloadIcon, PlayCircle } from "lucide-react";
import PianoRoll from "@/components/music/PianoRoll/PianoRoll";
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
          <Heading as="h3">Generated MIDI melody...</Heading>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            <Stack>
              <Stack direction="row">
                <Button size="2xs" bg="blue.7">
                  <DownloadIcon /> Export MIDI
                </Button>
              </Stack>
              <PianoRoll notes={notes} />
            </Stack>
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default MusicGenerationTool;
