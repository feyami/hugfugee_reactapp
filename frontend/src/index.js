import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./redux/store.js";
import { LocalizationProvider } from "@mui/x-date-pickers"; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SettingsProvider from "contexts/SettingsContext";
import TitleContextProvider from "./contexts/TitleContext";
import { ContextProvider } from './contexts/SocketIoContext';  
import "simplebar/dist/simplebar.min.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
  <LocalizationProvider dateAdapter={AdapterDayjs}> 
 
    <Provider store={store}> 
    <ContextProvider>
      <SettingsProvider>
        <TitleContextProvider>
       
          <BrowserRouter>
            <App />
          </BrowserRouter>
          
        </TitleContextProvider>
      </SettingsProvider>
       </ContextProvider>
      </Provider>
 
   </LocalizationProvider>
 
);
