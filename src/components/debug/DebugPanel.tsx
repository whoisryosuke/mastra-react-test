import React from "react";
import { Box } from "styled-system/jsx";
import ThemeSwitcher from "../theme/ThemeSwitcher";

type Props = {};

const DebugPanel = (props: Props) => {
  return (
    <Box position="absolute" top="1" right="1">
      <ThemeSwitcher />
    </Box>
  );
};

export default DebugPanel;
