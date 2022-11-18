import { Edit } from "@mui/icons-material";
import { IconButton, Divider } from "@mui/material";
import StyledAvatar from "../../StyledAvatar";
import { useState } from "react";
import AddContact from "../../../pages/contactManagement/AddContact";
import { Small, Tiny, Large } from "../../Typography";
import FlexBox from "../../Box/FlexBox";
import { useNavigate } from "react-router-dom";
const CommonCell = ({
  title,
  body
}) => <FlexBox flexDirection="column">
    <Small mb={0.5}>{title}</Small>
    <Tiny color="text.disabled">{body}</Tiny>
  </FlexBox>;
const PhoneCell = ({
  numberType,
  phoneNumber
}) => <FlexBox flexDirection="row"  alignItems= "center">
    <Small mb={0.5}  >{numberType}</Small>
    <Divider sx={{marginLeft: '5%', marginRight: '5%'}} orientation="vertical" flexItem/>
    <Large color="text.disabled">{phoneNumber}</Large>  
  </FlexBox>;

const PhoneNumbersCell = ({
  phoneNumbers
}) => <FlexBox flexDirection="column">
    {Object.keys(phoneNumbers).map((numberType, index) => <><PhoneCell key={index} numberType={numberType} phoneNumber={phoneNumbers[numberType]} />
  <Divider sx={{marginTop: '1%', marginBottom: '1%'}} orientation="horizontal" flexItem/></> )}
  </FlexBox>;



const columnShape = [{
  minWidth: 100,
  Header: "First Name",
  accessor: "firstName"
}, {
  minWidth: 100,
  Header: "Last Name",
  accessor: "lastName"
}, {
  Header: "Company",
  accessor: "company"
},{
  minWidth: 150,
  Header: "Email",
  accessor: "email",
  
},{
  minWidth: 100,
  Header: "Phone Numbers",
  accessor: "phoneNumbers",
  Cell: ({
    row
  }) => {
    const {
      phoneNumbers
    } = row.original;
    return <PhoneNumbersCell phoneNumbers={phoneNumbers} />;
  }
},{
  Header: "Edit",
  accessor: "edit",
  Cell: props => {
    const {
      state,
      row
    } = props;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const selectedRow = Object.keys(state.selectedRowIds).includes(row.id);
    return <>
          <IconButton component="span" disableRipple onClick={()=>navigate("/dashboard/contact-add",{state:row.original})}>
            <Edit sx={{
          color: selectedRow ? "primary.main" : "text.disabled"
        }} />
          </IconButton>
         
        </>;
  }
}];
export default columnShape;