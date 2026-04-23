import React, { useState } from "react";
import type { ToolItemProps } from "./types";
import { Accordion, Badge, Button, Heading, Text } from "@/components/ui";
import { Flex, Stack } from "styled-system/jsx";
import PianoKeySimple from "@/components/music/piano/PianoKeySimple";
import { useNotePlayer, type NoteWithOctave } from "@/hooks/useNotePlayer";
import { PlayCircle } from "lucide-react";

type Chord = {
  name: string;
  tonic: string;
  notes: string[];
  intervals: string[];
  aliases: string[];
};

type ChordBreakdownProps = {
  chord: Chord;
};
const ChordBreakdown = ({ chord }: ChordBreakdownProps) => {
  const [noteState, setNoteState] = useState(
    new Array(chord.notes.length).fill(false),
  );
  const { play } = useNotePlayer();

  const lightUpNotes = () => {
    setNoteState(new Array(chord.notes.length).fill(true));

    setTimeout(
      () => setNoteState(new Array(chord.notes.length).fill(false)),
      400,
    );
  };

  const handlePlay = () => {
    const notes: NoteWithOctave[] = chord.notes.map((note) => ({
      note,
      octave: 4,
    }));
    play(notes);

    lightUpNotes();
  };

  return (
    <Flex direction="column" gap="3">
      <Heading as="h2" fontSize="4xl" color="gray.12" fontWeight="bold">
        {chord.name}
      </Heading>
      <Flex direction="row" gap="1" alignItems="center">
        <Text fontSize="lg" mr="2">
          Aliases
        </Text>
        {chord.aliases.map((alias) => (
          <Badge colorPalette="gray" borderRadius="full" size="2xl">
            {chord.tonic}
            {alias}
          </Badge>
        ))}
      </Flex>

      <Flex direction="row" gap="1">
        {chord.notes.map((note, index) => (
          <PianoKeySimple
            key={`${note}-${index}`}
            note={note}
            playing={noteState[index]}
          />
        ))}
        <Button onClick={handlePlay} colorPalette="blue" size="xs">
          <PlayCircle />
        </Button>
      </Flex>

      <Flex direction="row" gap="1" alignItems="center">
        <Text fontSize="lg" mr="2">
          Intervals
        </Text>
        {chord.intervals.map((interval) => (
          <Badge
            colorPalette="gray"
            variant="outline"
            borderRadius="full"
            size="2xl"
          >
            {interval}
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
};

type Props = ToolItemProps;

const ChordTool = ({ id, index, content, className }: Props) => {
  const chords = content.output.chords as Chord[];
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
            {chords.map((chord) => (
              <ChordBreakdown key={chord.name} chord={chord} />
            ))}
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default ChordTool;
