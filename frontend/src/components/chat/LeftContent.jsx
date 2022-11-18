 
import { Avatar, Box,  Card, Divider,Tooltip,Button,TextField } from "@mui/material";
import ConversationBox from "components/chat/ConversationBox";
import FlexBox from "components/Box/FlexBox";
import {  H6 , Tiny } from "components/Typography";
import { Fragment } from "react";
import ScrollBar from "simplebar-react"; // styled components
import AddIconButton from "components/Button/AddIconButton";

const LeftContent = ({
    chats,
    user
  }) =>{
  return <Fragment>
       
      <Card  >
      
        <FlexBox  px={3} py={3} alignItems="center" justifyContent="center">
          <Avatar src={user?.photo} sx={{
          width: 42,
          height: 42
        }} />

          <Box marginLeft={1}>
            <H6>{user?.fullName}</H6>
            <Tiny color="text.disabled" fontWeight={500}>
              {user?.role}
            </Tiny>
          </Box>
        </FlexBox>

        {/* <Divider />
        <AddIconButton/> */}
<Divider />
        <Box mt={2}>
          

          <ScrollBar style={{
          height: 500
        }}>
          
            {chats.map((chat, index) => <ConversationBox key={index} chat={chat} />)}
          </ScrollBar>
        </Box>
      </Card>
    </Fragment>
    };

export default LeftContent;