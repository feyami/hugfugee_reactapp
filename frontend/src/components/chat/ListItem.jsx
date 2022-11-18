import { Box } from "@mui/system";
import FlexBox from "components/Box/FlexBox";
import { Tiny } from "components/Typography";
import FileIcon from "assets/icons/FileIcon";
import React from "react"; // component props interface

const ListItem = ({
  hideIcon
}) => {
  return <FlexBox alignItems="center" justifyContent="space-between" mb={2}>
      <FlexBox alignItems="center">
        {!hideIcon && <FileIcon sx={{
        color: "text.disabled",
        marginRight: 1
      }} />}
        <Box>
          <Tiny fontWeight={500} display="block">
            Reference Zip
          </Tiny>
          <Tiny fontWeight={500} color="text.disabled" display="block">
            Oct 21, 2021
          </Tiny>
        </Box>
      </FlexBox>

      <Tiny fontWeight={500} color="text.disabled" display="block">
        1.8MB
      </Tiny>
    </FlexBox>;
};

export default ListItem;