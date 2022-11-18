import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/theme/themeSlice";
import languageSlice from "./features/language/languageSlice"; 
import authReducer from "../redux/features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import videoConnectionReducer from "./features/videoConnection/videoConnectionSlice"; 
import chatSlicer from "./features/chat/chatSlice";
import messageSlicer from "./features/chat/messageSlice";

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        language: languageSlice, 
        auth: authReducer,
        user: userReducer,
        videoConnectionReducer,
        chat: chatSlicer,
        message: messageSlicer,

    }
});