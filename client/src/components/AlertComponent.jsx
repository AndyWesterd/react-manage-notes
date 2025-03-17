import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';


export const AlertComponent = ({ open, onClose, time, title, severity }) => {

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <Snackbar open={open} autoHideDuration={time} slot={{TransitionLeft}} onClose={onClose}>
      <Alert variant='filled' severity={severity}>{title}</Alert>
    </Snackbar>
  );
};
