import React, { useContext } from 'react';
import { Grid, Typography, Paper, styled } from '@mui/material';

import { SocketContext } from 'contexts/SocketIoContext';
import { useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {addNewVideoConnection} from 'redux/features/videoConnection/videoConnectionSlice';
 

const GridContainer = styled(Grid)(() => ({
  justifyContent: 'center',
}));


const VideoPlayer = ({selectedLanguage}) => {
  const { me ,name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = ""
  console.log('selectedLanguage', selectedLanguage);
  const dispatch = useDispatch();
useEffect(() => {
   dispatch(addNewVideoConnection({refConnectionId:me, languageId:selectedLanguage._id, status:true}));
}, [me, selectedLanguage, dispatch]);



  return (
    <GridContainer>
       
        <Paper className={classes.paper}>
          <Grid item xs={8} md={8}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay   width={"350"}/>
          </Grid>
        </Paper>
       
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay width={"350"}  />
          </Grid>
        </Paper>
      )}
    </GridContainer>
  );
};

export default VideoPlayer;


//   <div className="video-control">
//     <button
//       key="btnVideo"
//       type="button"
//       className={getButtonClass('fa-video-camera', video)}
//       onClick={() => toggleMediaDevice('video')}
//     />
//     <button
//       key="btnAudio"
//       type="button"
//       className={getButtonClass('fa-microphone', audio)}
//       onClick={() => toggleMediaDevice('audio')}
//     />
//     <button
//       type="button"
//       className="btn-action hangup fa fa-phone"
//       onClick={() => endCall(true)}
//     />
//   </div>
// </div>