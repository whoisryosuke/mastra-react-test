import { Box, Flex, Stack } from "styled-system/jsx";
import { Text as UiText } from "@/components/ui";
import React, { useMemo } from "react";
import type { MidiNote } from "@/types/music";
import { Note } from "tonal";
import { NOTES_ALL_IN_ORDER } from "@/constants/music";
import type { PianoRollNoteData } from "./types";
import PianoRow from "./PianoRow";

type Props = {
  notes: MidiNote[];
};

const PianoRoll = ({ notes }: Props) => {
  const sortedNotes = notes.map((note) => {
    const noteMetadata = Note.get(note.pitch);
    return {
      note,
      metadata: noteMetadata,
    } as PianoRollNoteData;
  });

  const octaveRange = sortedNotes.reduce(
    (minMax, noteData) => {
      const octave = noteData.metadata.oct;
      if (!octave) return minMax;

      if (octave < minMax.min) {
        minMax.min = octave;
      }
      if (octave > minMax.max) {
        minMax.max = octave;
      }
      return minMax;
    },
    { min: 100, max: 0 },
  );

  console.log("sortedNotes", sortedNotes, octaveRange);

  const numLanes = Math.min(octaveRange.max - octaveRange.min, 7) + 1;

  const renderRow = (noteLetter, index, octave) => (
    <PianoRow octave={octave} noteLetter={noteLetter} notes={sortedNotes} />
  );
  const renderOctave = (_, octave) =>
    NOTES_ALL_IN_ORDER.map((noteLetter, index) =>
      renderRow(noteLetter, index, octaveRange.min + octave),
    );
  const renderLanes = new Array(numLanes).fill(0).map(renderOctave);

  return (
    <Stack overflowX="auto" gap="0">
      {renderLanes}
    </Stack>
  );
};

export default PianoRoll;
