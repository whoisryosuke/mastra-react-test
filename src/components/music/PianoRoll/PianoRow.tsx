import React from "react";
import { Box } from "styled-system/jsx";
import type { NoteType } from "tonal";
import type { PianoRollNoteData } from "./types";
import PianoRollNote from "./PianoRollNote";
import PianoRollKey from "./PianoRollKey";

type Props = {
  octave: number;
  noteLetter: string;
  notes: PianoRollNoteData[];
};

const PianoRow = ({ notes, noteLetter, octave }: Props) => {
  const rowNotes = notes.filter(
    (data) => data.metadata.letter == noteLetter && data.metadata.oct == octave,
  );
  return (
    <Box
      position="relative"
      width="100%"
      minHeight="6"
      name={`piano-roll-row-${octave}`}
    >
      <PianoRollKey noteLetter={noteLetter} octave={octave} />
      {rowNotes.map((note) => (
        <PianoRollNote note={note} />
      ))}
    </Box>
  );
};

export default PianoRow;
