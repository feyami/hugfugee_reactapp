import { Brightness4 } from "@mui/icons-material";
import { AppBar, Box, IconButton, styled, Toolbar, useMediaQuery } from "@mui/material";
import FlexBox from "components/Box/FlexBox";
import { H2 } from "components/Typography";
import { SettingsContext } from "contexts/SettingsContext";
import { TitleContext } from "contexts/TitleContext";
import LTR from "assets/icons/LTR";
import RtlIcon from "assets/icons/RTL";
import ThemeIcon from "assets/icons/ThemeIcon";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { THEMES } from "theme/constants";
import ActivityPopover from "./popovers/ActivityPopover";
import LanguagePopover from "./popovers/LanguagePopover";
import NotificationsPopover from "./popovers/NotificationsPopover";
import ProfilePopover from "./popovers/ProfilePopover";
import ServicePopover from "./popovers/ServicePopover"; // root component interface
import Logo from "assets/icons/hugfugee_logo.png"; 
import { selectUser } from "redux/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux"; 
// custom styled components
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
const ToggleIcon = styled(Box)(({
  theme
}) => ({
  width: 25,
  height: 3,
  margin: "5px",
  borderRadius: "10px",
  transition: "width 0.3s",
  backgroundColor: theme.palette.primary.main
})); // root component

const DashboardNavbar = props => {
  const {
    sideBarLocked,
    setSideBarLocked,
    setShowMobileSideBar,
    setOpenSecondarySideBar
  } = props;
  const {
    t
  } = useTranslation();
  const {
    title
  } = useContext(TitleContext);
  const {
    settings,
    saveSettings
  } = useContext(SettingsContext);
  const downMd = useMediaQuery(theme => theme.breakpoints.down(1200));
  const upSm = useMediaQuery(theme => theme.breakpoints.up("sm"));
  const downSm = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const user=useSelector(selectUser);
  const handleChangeTheme = theme => {
    saveSettings({ ...settings,
      theme
    });
  };

  const handleChangeDirection = direction => {
    saveSettings({ ...settings,
      direction
    });
  };

  const handleToggleBtn = () => {
    if (downMd) {
      setShowMobileSideBar();
    } else {
      setSideBarLocked();
      setOpenSecondarySideBar();
    }
  };

 
  return <DashboardNavbarRoot position="sticky">
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

        
            
           {user&&user.role==="volunteer"&&<NotificationsPopover />}
           {user&&user.role==="volunteer"&&<ProfilePopover />}
            
             
      </StyledToolBar>
    </DashboardNavbarRoot>;
};

export default DashboardNavbar;