import { KeyboardArrowLeft, Send } from "@mui/icons-material";
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  InputBase,
  styled,
} from "@mui/material";
import IncomingMsg from "components/chat/IncomingMsg";
import OutgoingMsg from "components/chat/OutgoingMsg";
import FlexBox from "components/Box/FlexBox";
import { H4 } from "components/Typography";
import ScrollBar from "simplebar-react"; // styled components
import { getSender, getSenderFull } from "utils/ChatLogics";
import animationData from "assets/animations/typing.json";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "redux/features/chat/messageSlice";
import { useSelector, useDispatch } from "react-redux";

var socket, selectedChatCompare;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const LeftButton = styled(Box)(({ theme, screen = "md" }) => ({
  top: 110,
  padding: 5,
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  position: "absolute",
  justifyContent: "center",
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
  [theme.breakpoints.up(screen)]: {
    display: "none",
  },
}));

const MessagesArea = ({
  selectedChat,
  setOpenLeft,
  user,
  notification,
  setNotification,
}) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const message = useSelector((state) => state.message.message);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  const getMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
     
      dispatch(fetchMessages(selectedChat._id));
      
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
        setLoading(false);
    }
    };

    const sendMyMessage = async (event) => {
        //if (event.key === "Enter" && newMessage) {
          if (newMessage) {
          socket.emit("stop typing", selectedChat._id);
         try { 
            setNewMessage("");
             dispatch(sendMessage({ content: newMessage, selectedChat: selectedChat, sender: user._id })) 
               
             
              socket.emit("send message", {
                content: newMessage,
                selectedChat: selectedChat,
                sender: user,
              });
        
            
        }
        catch (error) {
            console.log(error);

          
        }
      };
    };

    useEffect(() => {
        socket = io(BACKEND_URL);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    
        // eslint-disable-next-line
      }, []);
    
      useEffect(() => {
         getMessages()  
    
        selectedChatCompare = selectedChat;
        // eslint-disable-next-line
      }, [selectedChat]);
    
      useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
          if (newMessageReceived.sender._id !== user._id) {
            setNotification(notification + 1);
          }
          alert("new message received");
           
        });
      },[socket]);


      const typingHandler = (e) => {
        setNewMessage(e.target.value);
    
        if (!socketConnected) return;
    
        if (!typing) {
          setTyping(true);
          socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;
          if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
          }
        }, timerLength);
      };

  return (
    
      <Card
        sx={{
          position: "relative",
        }}
      >
        <LeftButton screen="md" onClick={() => setOpenLeft(true)}>
          <KeyboardArrowLeft fontSize="small" color="disabled" />
        </LeftButton>

        <FlexBox
          px={3}
          py={4}
          alignItems="center"
          justifyContent="center"
          style={{
            height: 90,
          }}
        >
          {selectedChat &&
            (!selectedChat.isGroupChat ? (
              <H4>{getSender(selectedChat.users)}</H4>
            ) : (
              <H4>{selectedChat.chatName}</H4>
            ))}
        </FlexBox>

        <Divider />

        <ScrollBar
        
          style={{
            height: 425,
            paddingLeft: 16,
            paddingRight: 16
          }}
        >
          
            {/* <FlexBox justifyContent="center">
            <Tiny px={1.5} py={0.2} display="block" fontWeight={500} borderRadius="10px" color="text.disabled" bgcolor="secondary.100">
              August 21
            </Tiny>
          </FlexBox> */}
{messages&& (messages.map((msg, index) => {
    return (
        <Box key={index} mb={3}>
          {console.log("msg",msg)}
          {console.log("index",index)}
          {console.log("id",user)}
        {msg&&(msg.sender?._id === user._id ? <OutgoingMsg msg={msg} />:<IncomingMsg msg={msg} />)}
        </Box>
    );
}
))}
           
         
        </ScrollBar>

        <Divider />

        <FlexBox justifyContent="space-between" alignItems="center" p={3}>
          <InputBase
          onChange={typingHandler}
          value={newMessage}
            placeholder="Write a message..."
            sx={{
              width: "100%",
              fontSize: 15,
              fontWeight: 500,
              color: "text.disabled",
            }}
          />

          <IconButton
         
            sx={{
              marginLeft: 1.5,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            <Send
             onClick={sendMyMessage}
              sx={{
                fontSize: 18,
                color: "background.paper",
              }}
            />
          </IconButton>
        </FlexBox>
      </Card>
  
  );
};

export default MessagesArea;
