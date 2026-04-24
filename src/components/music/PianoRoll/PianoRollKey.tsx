import { Text } from "@/components/ui";
import React from "react";
import { Box, Flex } from "styled-system/jsx";

type Props = {
  noteLetter: string;
  octave: number;
};

const PianoRollKey = ({ noteLetter, octave }: Props) => {
  const isBlackKey = noteLetter.includes("#");
  return (
    <Flex
      bg={isBlackKey ? "gray.3" : "gray.10"}
      minWidth="40px"
      position="absolute"
      top="0"
      left="0"
      height="100%"
      alignItems="center"
      borderTopRightRadius="md"
      borderBottomRightRadius="md"
    >
      <Text color={isBlackKey ? "gray.10" : "gray.3"} fontSize="2xs" p="1">
        {noteLetter}
        {octave}
      </Text>
    </Flex>
  );
};

export default PianoRollKey;
