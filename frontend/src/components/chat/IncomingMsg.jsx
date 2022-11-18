import { Box, useTheme } from "@mui/material";
import FlexBox from "components/Box/FlexBox";
import { Tiny } from "components/Typography";
import StyledAvatar from "components/StyledAvatar";
import React from "react";

const IncomingMsg = ({msg}) => {
  
  const theme = useTheme();
  const lightTheme = theme.palette.mode === "light";
  return <FlexBox mt={3}>
      {msg.sender && <StyledAvatar src={msg.sender.photo} sx={{
      width: 28,
      height: 28
    }} />}
      <Box sx={{
      padding: 2,
      maxWidth: 250,
      marginLeft: 1.5,
      borderRadius: "0px 8px 8px 8px",
      backgroundColor: lightTheme ? "secondary.200" : "divider"
    }}>
        <Tiny display="block" fontWeight={500} lineHeight={1.7}>
          {msg.content}
        </Tiny>
      </Box>
    </FlexBox>;
};

export default IncomingMsg;