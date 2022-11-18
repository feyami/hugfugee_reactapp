import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails, AccordionSummary as MuiAccordionSummary, styled, Divider } from '@mui/material';
import { H6 } from '../../components/Typography';
import MenuIcon from '@mui/icons-material/Menu';
// styled components
const Accordion = styled(MuiAccordion)(({
  theme
}) => ({
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  color: theme.palette.text.disabled
}));
const AccordionSummary = styled(props => <MuiAccordionSummary {...props} expandIcon={<MenuIcon sx={{
  fontSize: '2rem',
  color: 'text.disabled',
  marginRight: '8px',
  borderRight: '1px solid',
}} /> } />)(({
  theme
}) => ({
   
  flexDirection: 'row-reverse',
  padding: 0,
  '& .Mui-expanded': {
    color: theme.palette.primary.main
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
      
    },
    
  },
    
  // '& .MuiAccordionSummary-content': {
  //   marginLeft: theme.spacing(1),
  // },
}));

const MyAccordion = ({
  accordionHeader,
  children,
  expandedItem,
  handleChange
}) => {
  return <Accordion square disableGutters elevation={0} expanded={expandedItem === accordionHeader} onChange={handleChange(accordionHeader)} sx={{
    left: '0 !important'
  }}>
      <AccordionSummary sx={{
      px: '1rem',
      py: '0.6rem'
    }}>
        <H6>{accordionHeader}</H6>
      </AccordionSummary>
      <Divider />
      <MuiAccordionDetails sx={{
      padding: 0
    }}>{children}</MuiAccordionDetails>
    </Accordion>;
};

export default MyAccordion;