import { Box, Flex } from "styled-system/jsx";
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
  const sortedNotes = notes.reduce(
    (merge, note) => {
      const noteMetadata = Note.get(note.pitch);

      const octave = noteMetadata.oct;
      if (octave) {
        if (!(octave in merge)) merge[octave] = {};
        if (!(noteMetadata.letter in merge[octave]))
          merge[octave][noteMetadata.letter] = [];
        merge[octave][noteMetadata.letter].push({
          note,
          metadata: noteMetadata,
        });
      }

      return merge;
    },
    {} as Record<string, Record<string, PianoRollNoteData[]>>,
  );

  const octaveRange = Object.keys(sortedNotes).reduce(
    (minMax, rawOctave) => {
      const octave = parseInt(rawOctave);
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

  const numLanes = Math.min(octaveRange.max - octaveRange.min, 8);

  const renderRow = (noteLetter, index, octave) => (
    <PianoRow octave={octave} notes={sortedNotes[octave][noteLetter]} />
  );
  const renderOctave = (_, octave) =>
    NOTES_ALL_IN_ORDER.map((noteLetter, index) =>
      renderRow(noteLetter, index, octaveRange.min + octave),
    );
  const renderLanes = new Array(numLanes).fill(0).map(renderOctave);

  return <div>{renderLanes}</div>;
};

export default PianoRoll;
