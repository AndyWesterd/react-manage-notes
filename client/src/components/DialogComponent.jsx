import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';

export const DialogComponent = ({ open, onClose, title, children, actions }) => {

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"  >
                {title && <DialogTitle color='secondary'>{title}</DialogTitle>}
                {children && <DialogContent style={{font: 'caption' }}>{children}</DialogContent>}
                {actions && <DialogActions>{actions}</DialogActions>}
            </Dialog>
        </>
    );
};
