import * as React from 'react';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { styled, lighten, darken } from '@mui/system';
 
import Autocomplete from '@mui/material/Autocomplete';
import DarkTextField from '../textField/DarkTextField';


const StyledAutoComplete=styled(Autocomplete)(({ theme }) => ({
  height: 35,
  fontSize: 12,
    '& .MuiAutocomplete-inputRoot': {
      height: '30px',
         
         
    },
}));

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));
const GroupItems = styled('ul')({
  padding: 0,
}); 
 
  
const AutoCompleteWithAdd=()=> {

const options = data.map((option) => {
    const firstLetter = option.companyName[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  }); 
 
 

  return (

    <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
  >
      <StyledAutoComplete
      id="companyName"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.companyName}
      sx={{ width: 300 }}
      renderInput={(params) => <DarkTextField {...params} label="With categories" />}
      renderGroup={(params) => (
        <li>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
 
  
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" title='Add Customer'>
      <AddOutlinedIcon />
    </IconButton>
   
     
  </Paper>


   
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const data = [
  { companyName: 'The Shawshank Redemption', _id: "1994" },
  { companyName: 'The Godfather', _id: "1972" },
  { companyName: 'The Godfather: Part II', _id: "1974" },
  
];



 export default AutoCompleteWithAdd;

 