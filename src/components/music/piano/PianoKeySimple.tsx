import { Heading } from "@/components/ui";
import React from "react";
import { Flex } from "styled-system/jsx";

type Props = {
  note: string;
};

const PianoKeySimple = ({ note }: Props) => {
  return (
    <Flex
      p="4"
      pt="20"
      pb="2"
      borderRadius="xl"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border"
      bg="gray.3"
    >
      <Heading as="h4" fontSize="2xl" fontWeight="bold">
        {note}
      </Heading>
    </Flex>
  );
};

export default PianoKeySimple;
