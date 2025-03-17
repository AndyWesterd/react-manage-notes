import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/ButtonComponent';
import { FormRegister } from './FormRegister';
import { AlertComponent } from '../../components/AlertComponent';
import { login } from '../../services/authService';

import { TextField, CircularProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import styles from './styles.module.css';

export const FormLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook para redirigir
    const [open, setopen] = useState(false);
    const [infoAlert, setinfoAlert] = useState({ openAlert: false, title: '', severity: '' });

    const buttonsLogin = [{
        id: 'logIn',
        title: loading ? <CircularProgress size={24} color="secondary" /> : 'Log in',
        variant: 'contained',
        color: 'secondary',
        disabled: loading,
        size: 'large',
        endicon: <ArrowForwardOutlinedIcon />,
    },
    {
        id: 'signUp',
        title: 'Sign up',
        variant: 'outlined',
        color: 'secondary',
        disabled: false,
        size: 'large',
        endicon: null
    }];

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        setTimeout(async () => {
            try {
                const response = await login(username, password);

                setinfoAlert({ openAlert: true, title: 'Success: ' + response.message, severity: 'success' });
                navigate("/notes"); // Redirigir a la página de notas
            } catch (err) {
                setError(err);
                setinfoAlert({ openAlert: true, title: 'Error: ' + err, severity: 'error' });
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    const onClicButton = (id) => {
        if (id === 'signUp') {
            setopen(true);
        } else {
            handleLogin();
        }
    };

    return (
        <div className={styles.mainContainerLogin}>
            <div className={styles.formContainerLogin}>
                <div className={styles.containerTitleLogin}>
                    <h1>Log in</h1>
                    <AccountCircleIcon className={styles.loginIcon} />
                </div>
                <div className={styles.containerInputLogin}>
                    <div className={styles.fieldUserName}>
                        <TextField
                            required
                            id='userNameTextfield'
                            color='secondary'
                            label='username'
                            variant='outlined'
                            value={username}
                            fullWidth
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.fieldPassword}>
                        <TextField
                            required
                            type='password'
                            id='passwordTextfield'
                            color='secondary'
                            label='password'
                            variant='outlined'
                            value={password}
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <>
                    {buttonsLogin.map((bt) => (
                        <ButtonComponent
                            id={bt.id}
                            title={bt.title}
                            variant={bt.variant}
                            color={bt.color}
                            disabled={bt.disabled}
                            size={bt.size}
                            endicon={bt.endicon}
                            onClick={() => onClicButton(bt.id)}
                        />
                    ))}
                </>
            </div>
            <FormRegister open={open} onClose={() => setopen(false)} ></FormRegister>
            <AlertComponent
                open={infoAlert.openAlert}
                onClose={() => setinfoAlert({ openAlert: false })}
                time={3000}
                title={infoAlert.title}
                severity={infoAlert.severity}
            />
        </div>
    );
};
