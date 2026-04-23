import { Box, Flex } from "styled-system/jsx";
import { Text as UiText } from "@/components/ui";
import React, { useMemo } from "react";
import type { MidiNote } from "@/types/music";

type Props = {
  notes: MidiNote[];
  zoom?: number; // 1.0 = normal, > 1.0 = zoomed in, < 1.0 = zoomed out
  width?: number;
  height?: number;
};

const PianoRoll = ({ notes, zoom = 1, width = 800, height = 200 }: Props) => {
  // Calculate total duration needed for the piano roll
  const maxTime = useMemo(() => {
    if (notes.length === 0) return 1;
    return Math.max(...notes.map((note) => note.time + note.duration));
  }, [notes]);

  // Convert time to pixels based on zoom level
  const timeToPixels = (time: number) => {
    return time * 50 * zoom; // 50px per second with zoom factor
  };

  // Calculate the total width needed for the piano roll
  const totalWidth = timeToPixels(maxTime);

  // Generate time markers for the timeline
  const timeMarkers = useMemo(() => {
    if (maxTime <= 0) return [];
    const markers = [];
    const interval = Math.max(1, Math.ceil(maxTime / 10)); // Show at most 10 markers

    for (let i = 0; i <= maxTime; i += interval) {
      markers.push(i);
    }

    return markers;
  }, [maxTime]);

  return (
    <Box
      position="relative"
      width={width}
      height={height}
      border="1px solid"
      borderColor="border"
      borderRadius="md"
      overflow="hidden"
      bg="surface"
    >
      {/* Timeline markers */}
      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="30px"
        borderBottom="1px solid"
        borderColor="border"
        bg="surface"
        zIndex={1}
      >
        {timeMarkers.map((time) => (
          <Box
            key={time}
            position="absolute"
            top="0"
            left={`${timeToPixels(time)}px`}
            height="100%"
            width="1px"
            bg="border"
          >
            <UiText
              position="absolute"
              bottom="2px"
              left="50%"
              transform="translateX(-50%)"
              fontSize="xs"
              color="text.secondary"
            >
              {time}s
            </UiText>
          </Box>
        ))}
      </Flex>

      {/* Scrollable content area */}
      <Box
        position="absolute"
        top="30px"
        left="0"
        right="0"
        bottom="0"
        overflowX="auto"
        overflowY="hidden"
        height={`calc(100% - 30px)`}
      >
        {/* Timeline background */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width={totalWidth}
          height="100%"
          bg="surface"
        >
          {/* Grid lines */}
          {timeMarkers.map((time) => (
            <Box
              key={`grid-${time}`}
              position="absolute"
              top="0"
              left={`${timeToPixels(time)}px`}
              height="100%"
              width="1px"
              bg="border"
              opacity="0.3"
            />
          ))}
        </Box>

        {/* Notes */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width={totalWidth}
          height="100%"
        >
          {notes.map((note) => (
            <Box
              key={`${note.pitch}${note.time}`}
              position="absolute"
              top="50%"
              left={`${timeToPixels(note.time)}px`}
              width={`${timeToPixels(note.duration)}px`}
              height="60%"
              transform="translateY(-50%)"
              bg="blue.500"
              borderRadius="sm"
              opacity="0.8"
            >
              <UiText
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                fontSize="xs"
                fontWeight="bold"
              >
                {note.pitch}
              </UiText>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Playhead */}
      <Box
        position="absolute"
        top="30px"
        left="0"
        width="2px"
        height={`calc(100% - 30px)`}
        bg="red.500"
        zIndex={2}
        opacity="0.8"
      />
    </Box>
  );
};

export default PianoRoll;
