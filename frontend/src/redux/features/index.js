//* index file for calling all slices from one place
import { useSelector, useDispatch } from "react-redux";
import * as authSlice from "./auth/authSlice";
import * as projectSlice from "./project/projectSlice";
import * as contactSlice from "./contact/contactSlice";
import * as customerSlice from "./customer/customerSlice";
import * as globalValuesSlice from "./globalValues";
import * as chatSlice from "./chat/chatSlice"; 
 

export const useAuthSlice = () => {
     
    const isAuthenticated = useSelector(authSlice.selectIsAuthenticated);
    const user = useSelector(authSlice.selectUser);
return {
    isAuthenticated,
    user
    };
};

export const useProjectSlice = () => {
    const dispatch = useDispatch();
    const { getProjects, getProjectsNames, getProjectsByCustomer, updateProject, deleteProject } = projectSlice;
    const { setProject,filterProjectByGivenValue } = globalValuesSlice;
    const project = useSelector((state) => state.project.project);
    const projects= useSelector((state) => state.project.projects);
    return {
        project,
        projects,
        getProjects: () => dispatch(getProjects()),
        getProjectsNames: () => dispatch(getProjectsNames()),
        getProjectsByCustomer: (id) => dispatch(getProjectsByCustomer(id)),
        updateProject: (data) => dispatch(updateProject(data)),
        deleteProject: (id) => dispatch(deleteProject(id)),
        setProject: (data) => dispatch(setProject(data)),
        filterProjectByGivenValue: (data) => dispatch(filterProjectByGivenValue(data))
    };
};

export const useContactSlice = () => {
    const dispatch = useDispatch();
    const { getContacts, updateContact, deleteContact } = contactSlice;
    const { setContact } = globalValuesSlice;
    const contact = useSelector((state) => state.contact.contact);
    const contacts = useSelector((state) => state.contact.contacts);
    return {
        contact,
        contacts,
        getContacts: () => dispatch(getContacts()),
        
        
        updateContact: (data) => dispatch(updateContact(data)),
        deleteContact: (id) => dispatch(deleteContact(id)),
        setContact: (data) => dispatch(setContact(data)),
    };
};

export const useCustomerSlice = () => {
    const dispatch = useDispatch();
    const { getCustomers,  updateCustomer, deleteCustomer } = customerSlice;
    const { setCustomer } = globalValuesSlice;
    const customer = useSelector((state) => state.customer.customer);
    const customers = useSelector((state) => state.customer.customers);
    return {
        customer,
        customers,
        getCustomers: () => dispatch(getCustomers()),
        
        updateCustomer: (data) => dispatch(updateCustomer(data)),
        deleteCustomer: (id) => dispatch(deleteCustomer(id)),
        setCustomer: (data) => dispatch(setCustomer(data)),
    };
};

export const useChatSlice = () => {
    const dispatch = useDispatch();
    const { fetchChats } = chatSlice;
    const { setChat } = globalValuesSlice;
    const chat = useSelector((state) => state.chat.chat);
    const chats = useSelector((state) => state.chat.chats);
    return {
        chat,
        chats,
        fetchChats: () => dispatch(fetchChats()),
        setChat: (data) => dispatch(setChat(data)),
    };
} 



 

 


