import { Avatar, Box, useTheme } from "@mui/material";
import FlexBox from "components/Box/FlexBox";
import { H6, Tiny } from "components/Typography";
import { getSender } from "utils/ChatLogics";
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import { checkMessageDate } from "utils/checkDate";
import { setSelectedChat }  from "redux/features/chat/chatSlice";
import {useSelector,useDispatch} from "react-redux";
const ConversationBox = ({
  chat
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return <FlexBox p={2} borderBottom={1} alignItems="center" justifyContent="space-between" borderColor={theme.palette.mode === "light" ? "secondary.200" : "divider"} sx={{
    "&:last-of-type": {
      borderBottom: 0
    },
    cursor: "pointer"
  }}>
      <FlexBox alignItems="center">

      {!chat.isGroupChat
                    ? <Avatar src={chat.image} sx={{
        width: 30,
        height: 30,
        backgroundColor: "primary.200"
      }} />: <PeopleOutlineTwoToneIcon sx={{
        width: 30,
        height: 30,
        backgroundColor: "primary.200"
      }} />}
        <Box marginLeft={1} onClick={() => {dispatch(setSelectedChat(chat))}}>
          <H6>{!chat.isGroupChat
                    ? getSender(chat.users)
                    : chat.chatName}</H6>
         {chat.latestMessage && (
                  <Tiny fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Tiny>
                )}
        </Box>
      </FlexBox>

      <Tiny color="text.disabled">{checkMessageDate(chat.latestMessage?.createdAt)}</Tiny>
    </FlexBox>;
};

export default ConversationBox;