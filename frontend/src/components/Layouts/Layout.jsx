import { Box, styled } from "@mui/material";
import { Fragment, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./NavBar.jsx";
 

 
const InnerWrapper = styled(Box)(({
  theme
}) => ({
  [theme.breakpoints.up("lg")]: { 
    maxWidth: 1200,
    margin: "auto"
  }
}));

const DashboardLayout = ({
  children
}) => {
   
  return <Fragment>
     

     
        <InnerWrapper>
       <Navbar/>
          {children || <Outlet />}
        </InnerWrapper>
     
    </Fragment>;
};

export default DashboardLayout;
 