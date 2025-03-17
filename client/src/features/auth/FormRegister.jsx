import React, { useState } from 'react';
import { DialogComponent } from '../../components/DialogComponent';
import { AlertComponent } from '../../components/AlertComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { TextField } from '@mui/material';

import { registerUser } from '../../services/authService';

import styles from './styles.module.css';

export const FormRegister = ({ open, onClose }) => {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [infoAlert, setinfoAlert] = useState({ openAlert: false, title: '', severity: '' });

    const handleRegister = async () => { // Registro del user
        try {
            const response = await registerUser({ username, password });
            setinfoAlert({ openAlert: true, title: 'Success: ' + response.message, severity: 'success' });
            setusername("");
            setpassword("")
            onClose();
        } catch (err) {
            setinfoAlert({ openAlert: true, title: 'Error: ' + err, severity: 'error' });
            console.log(err);
        }
    };

    const buttonsRegister = [{
        id: 'register',
        title: 'Register',
        variant: 'contained',
        color: 'secondary',
        disabled: false,
        size: 'medium',
        endicon: null,
        onClick: handleRegister
    },
    {
        id: 'cancel',
        title: 'Cancel',
        variant: 'outlined',
        color: 'secondary',
        disabled: false,
        size: 'medium',
        endicon: null,
        onClick: onClose
    }];

    return (
        <div className={styles.mainContainerRegister}>
            <DialogComponent
                open={open}
                onClose={onClose}
                title={'User register'}
                children={
                    <div className={styles.containerInputLogin}>
                        <div className={styles.fieldUserName}>
                            <TextField
                                required
                                id='userNameTextfieldReg'
                                color='secondary'
                                label='username'
                                variant='outlined'
                                value={username}
                                fullWidth
                                onChange={(e) => setusername(e.target.value)} />
                        </div>
                        <div className={styles.fieldPassword}>
                            <TextField
                                required
                                id='passwordTextfieldReg'
                                color='secondary'
                                label='password'
                                variant='outlined'
                                value={password}
                                fullWidth
                                onChange={(e) => setpassword(e.target.value)} />
                        </div>
                    </div>
                }
                actions={
                    buttonsRegister.map((bt) => (
                        <ButtonComponent
                            key={bt.id}
                            {...bt}
                        />
                    ))
                }>

            </DialogComponent>
            <AlertComponent
                open={infoAlert.openAlert}
                onClose={() => setinfoAlert({ openAlert: false })}
                time={4000}
                title={infoAlert.title}
                severity={infoAlert.severity}
            />
        </div>
    );
};
