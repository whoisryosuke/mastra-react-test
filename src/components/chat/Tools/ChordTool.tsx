import React from "react";
import type { ToolItemProps } from "./types";
import { Accordion, Badge, Heading, Text } from "@/components/ui";
import { Flex, Stack } from "styled-system/jsx";
import PianoKeySimple from "@/components/music/piano/PianoKeySimple";

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
          <PianoKeySimple key={`${note}-${index}`} note={note} />
        ))}
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
  console.log("chord tool", content);
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
