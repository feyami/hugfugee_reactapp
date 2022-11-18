import { Button, Card, styled, AppBar, Toolbar, IconButton, Box, Grid } from "@mui/material";
import FlexBox from "../components/Box/FlexBox";
import { H1, Small } from "../components/Typography";
import GitHubIcon from "../assets/icons/GitHubIcon";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { SettingsContext } from "contexts/SettingsContext";
import Logo from "assets/icons/hugfugee_logo.png"; 
import { useContext } from "react";
import { THEMES } from "theme/constants";
import ThemeIcon from "assets/icons/ThemeIcon";
import { Brightness4 } from "@mui/icons-material";
import { fetchLanguages } from "redux/features/language/languageSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
const SocialIconButton = styled(Button)(({ theme }) => ({
  width: "48%",
  height: 48,
  fontSize: 13,
  borderRadius: "6px",
  border: "2px solid",
  borderColor:
    theme.palette.mode === "light"
      ? theme.palette.text.secondary
      : theme.palette.divider,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: "0.5rem",
  },
}));

const DashboardNavbarRoot = styled(AppBar)(({
  theme
}) => ({
  zIndex: 11,
  boxShadow: "none",
  padding: "1rem",
   
  backdropFilter: "blur(6px)",
  backgroundColor: theme.palette.primary.main
}));
const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto"
  }
}));
const StyledIconButton = styled(IconButton)(() => ({
  "&:hover": {
    backgroundColor: "transparent"
  }
}));

const Login = () => {
  const {
    settings,
    saveSettings
  } = useContext(SettingsContext);
  const handleChangeTheme = theme => {
    saveSettings({ ...settings,
      theme
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchLanguages());
     
  }, [dispatch]);

  const languagesList=useSelector(state=>state.language.languages);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const google = () => {
    window.open(BACKEND_URL + "/auth/google", "_self");
  };

  return <>
 
  <DashboardNavbarRoot position="sticky">
    <StyledToolBar>
    <Box
          component="img"
          sx={{
          height: 64,
          }}
          alt="Your logo."
          src={Logo}
      />

      

      <Box flexGrow={1} ml={1} />

      

      {settings.theme === "light" ? <StyledIconButton disableRipple onClick={() => handleChangeTheme(THEMES.DARK)}>
          <ThemeIcon />
        </StyledIconButton> : <StyledIconButton disableRipple onClick={() => handleChangeTheme(THEMES.LIGHT)}>
          <Brightness4 />
        </StyledIconButton>}

      <GoogleIcon onClick={google} />
          
          
           
    </StyledToolBar>
  </DashboardNavbarRoot>
  

  <Grid container spacing={4} my={2} px={2}  >
  {languagesList?.map(language => <Grid item md={3} xs={6} key={language.code}>
      <img src={`https://flagcdn.com/w160/${language.code.toLowerCase()}.png`} alt={language.title} onClick={()=>navigate("/videocall",{state:language})}   width="100%" height="100%" style={{
    cursor: "pointer"
  }} /> 
  <Small>{language.title}</Small>
    </Grid>)}
</Grid>
      
   </>
};

export default Login;
