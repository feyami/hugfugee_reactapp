import { Tooltip,Button } from "@mui/material";  
import { checkDueDate, checkPassedDate } from "../../utils/checkDate";


export const CheckDueDateWithToolTip = ({ date,isWithTime, ...props }) => {
    const { difference,isOver, text, formattedDate, formattedDateWithTime } = checkDueDate(date);
     
    return (
        <Tooltip title={isWithTime?formattedDateWithTime:formattedDate} placement="top">
        <Button
           size="small"
           sx={{ color: isOver? "secondary.red":"success.main", backgroundColor:'transparent'  , fontWeight: "bold" }}
            {...props}
        >
            {text}
        </Button>
        </Tooltip>
    );
    }

    export const CheckPassedDateWithToolTip = ({ date,isWithTime, ...props }) => {
        
        const { difference, isStated, text, formattedDate, formattedDateWithTime } = checkPassedDate(date);
         
        return (
            <Tooltip title={isWithTime?formattedDateWithTime:formattedDate} placement="top">
            <Button
               size="small"
               sx={{ color: isStated? "text.primary":"success.main", backgroundColor:'transparent'  , fontWeight: "bold" }}
                {...props}
            >
                {text}
            </Button>
            </Tooltip> 
        );
        }
 
