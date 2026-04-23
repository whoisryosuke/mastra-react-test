import { Heading } from "@/components/ui";
import React from "react";
import { Flex } from "styled-system/jsx";

type Props = {
  note: string;
  playing: boolean;
};

const PianoKeySimple = ({ note, playing }: Props) => {
  return (
    <Flex
      p="4"
      pt="20"
      pb="2"
      borderRadius="xl"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={playing ? "blue.5" : "border"}
      bg={playing ? "blue.3" : "gray.3"}
      transition="background-color 120ms ease-out,border-color 120ms ease-out"
    >
      <Heading
        as="h4"
        fontSize="2xl"
        fontWeight="bold"
        color={playing ? "blue.10" : "gray.10"}
        transition="color 120ms ease-out"
      >
        {note}
      </Heading>
    </Flex>
  );
};

export default PianoKeySimple;
