import { BusinessCenter, Mail, Place, Translate, Phone,VideoCameraFrontSharp } from "@mui/icons-material";
import { Box, Card, Divider, Grid, styled,IconButton } from "@mui/material";
import FlexBox from "components/Box/FlexBox";
import { StyledBadge } from "components/Profile/StyledComponent"; 
import { H3, H4,H5, H6, Small, Tiny } from "components/Typography";
import StyledAvatar from "components/StyledAvatar";
 
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { selectUser } from "redux/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
const IconWrapper = styled(Box)(({
  theme,
  color
}) => ({
  width: 40,
  height: 40,
  color: "white",
  display: "flex",
  borderRadius: "4px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color ? color : theme.palette.primary.main
}));
const FollowWrapper = styled(Box)(() => ({
  maxWidth: 300,
  margin: "auto",
  paddingTop: 32,
  paddingBottom: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

const Profile = () => {
  const {
    t
  } = useTranslation();
  const dispatch = useDispatch(); 
  const user=useSelector(selectUser);

  const details = [{
    Icon: Place,
    boldText: user?.address,
    smallText: "Lives at"
  }, {
    Icon: Mail,
    boldText: user?.google.emails[0].value,
    smallText: "Email"
  }, {
    Icon: Translate,
    boldText: user?.languages.map((language, index) => language.title).join(", "),
    smallText: "Languages"
  }, {
    Icon: Phone,
    boldText: user?.phoneNumber,
    smallText: "Phone Number",
  }];


  return <Grid container spacing={3}>
  
      <Grid item md={5} xs={12}>
        <Card>
        <FlexBox m="3.5rem" flexWrap="wrap" alignItems="center" justifyContent="space-between">
          <FlexBox alignItems="center"  >
            
              <StyledAvatar alt="Travis Howard" src={user?.photo || "/static/avatar/001-man.svg"} sx={{
              width: 90,
              height: 90
            }} />
             
            <Box ml="1rem">
              <H5>{user.fullName}</H5>
              <Tiny color="text.disabled">Volunteer</Tiny>
            </Box>
          </FlexBox>

          <Box padding={3}>
            

            <Box mt={3}>
              {details.map(({
              Icon,
              smallText,
              boldText
            }, index) => <FlexBox alignItems="center" mt={1.5} key={index}>
                  <Icon />
                  <H6 marginLeft={1}>
                    <Small>{smallText}</Small> {boldText}
                  </H6>
                </FlexBox>)}
            </Box>
          </Box>
        </FlexBox>
          <FollowWrapper>
            {user?.languages.map((language, index) => <FlexBox flexDirection="column" alignItems="center" key={index}>
           
            <StyledBadge overlap="circular" anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }} badgeContent={  
    
                      <IconButton aria-label="upload picture" component="span">
                        <VideoCameraFrontSharp sx={{
                    fontSize: 20,
                    color: "background.paper"
                  }} />
                      </IconButton>
                    }>
                  <StyledAvatar alt="Travis Howard" src={`https://flagcdn.com/w160/${language.code.toLowerCase()}.png`} sx={{
                  width: 70,
                  height: 70
                }} />
                </StyledBadge>


            
           
            
                </FlexBox>)}
                
            </FollowWrapper>
            
           

          <Divider />

          
        </Card>
      </Grid>

      
    </Grid>;
};


 
export default Profile;