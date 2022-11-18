import { Box, useTheme } from "@mui/material";
import FlexBox from "components/Box/FlexBox";
import { Tiny } from "components/Typography";
import React from "react";

const OutgoingMsg = ({msg}) => {
  const theme = useTheme();
  const lightTheme = theme.palette.mode === "light";
  return <FlexBox mt={3} justifyContent="end">
      <Box sx={{
      padding: 2,
      maxWidth: 250,
      marginLeft: 1.5,
      borderRadius: "8px 0px 8px 8px",
      backgroundColor: lightTheme ? "secondary.200" : "divider"
    }}>
        <Tiny display="block" fontWeight={500} lineHeight={1.7}>
          {msg.content}
        </Tiny>
      </Box>
    </FlexBox>;
};

export default OutgoingMsg;