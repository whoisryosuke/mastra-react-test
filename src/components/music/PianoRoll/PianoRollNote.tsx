import React from "react";
import type { NoteType } from "tonal";
import type { PianoRollNoteData } from "./types";
import { Box } from "styled-system/jsx";

const TRACK_START_PADDING = 0;

type Props = {
  note: PianoRollNoteData;
};

const PianoRollNote = ({ note }: Props) => {
  const left = TRACK_START_PADDING + note.note.time * 200;
  return (
    <Box position="absolute" top="0" left={left}>
      {note.note.pitch}
    </Box>
  );
};

export default PianoRollNote;
