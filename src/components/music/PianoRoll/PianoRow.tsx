import React from "react";
import { Box } from "styled-system/jsx";
import type { NoteType } from "tonal";
import type { PianoRollNoteData } from "./types";
import PianoRollNote from "./PianoRollNote";

type Props = {
  octave: number;
  notes: PianoRollNoteData[];
};

const PianoRow = ({ notes }: Props) => {
  return (
    <div>
      {notes.map((note) => (
        <PianoRollNote note={note} />
      ))}
    </div>
  );
};

export default PianoRow;
