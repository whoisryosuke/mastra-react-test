import React from "react";
import type { NoteType } from "tonal";
import type { PianoRollNoteData } from "./types";
import { Box, Flex } from "styled-system/jsx";
import { Text } from "@/components/ui";

const TIME_SCALE = 200;
const TRACK_START_PADDING = 40;

type Props = {
  note: PianoRollNoteData;
};

const PianoRollNote = ({ note }: Props) => {
  const width = note.note.duration * TIME_SCALE;
  const left = TRACK_START_PADDING + note.note.time * TIME_SCALE;
  return (
    <Flex
      position="absolute"
      top="0"
      bg="blue.4"
      height="100%"
      borderRadius="md"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="blue.5"
      alignItems="center"
      style={{
        width,
        left,
      }}
    >
      <Text p="1" fontSize="xs">
        {note.note.pitch}
      </Text>
    </Flex>
  );
};

export default PianoRollNote;
