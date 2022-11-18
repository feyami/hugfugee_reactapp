import { Cancel } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const CancelIconButton = props => {
  return <IconButton sx={{
    p: 0
  }} {...props}>
      <Box sx={{
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px dashed",
      borderRadius: "50%",
      borderColor: "secondary.red"
    }}>
        <Cancel fontSize="large" sx={{
        color: "secondary.red"
      }} />
      </Box>
    </IconButton>;
};

export default CancelIconButton;