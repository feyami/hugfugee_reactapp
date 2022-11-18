import { createSlice} from "@reduxjs/toolkit";
 


const initialState = {
contact:null,
customer:null,
project:null,
chat:null
};

const globalValuesSlice = createSlice({
name: "globalValues",
initialState,
reducers: {
setContact: (state, action) => {
state.contact = action.payload;
},
setCustomer: (state, action) => {
state.customer = action.payload;
},
setProject: (state, action) => {
state.project = action.payload;
},
setChat: (state, action) => {
state.chat = action.payload;
},
filterContactByGivenValue: (state, action) => {
state.contact = state.contact.filter((contact) => {
return contact[action.payload.key] === action.payload.value;
});
},
filterCustomerByGivenValue: (state, action) => {
state.customer = state.customer.filter((customer) => {
return customer[action.payload.key] === action.payload.value;
});
},
filterProjectByGivenValue: (state, action) => {
state.project = state.project.filter((project) => {
return project[action.payload.key] === action.payload.value;
});
},
}
});

export const {
setContact,
setCustomer,
setProject,
setChat,
filterContactByGivenValue,
filterCustomerByGivenValue,
filterProjectByGivenValue,
} = globalValuesSlice.actions;

export default globalValuesSlice.reducer;











