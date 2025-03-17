import React from 'react';
import Button from '@mui/material/Button';

import styles from './styles.module.css';

export const ButtonComponent = ({ id, title, variant, color, disabled, size, endicon, onClick }) => {

    return (
        <div className={styles.containerButton}>
            <Button
                id={id}
                variant={variant}
                color={color}
                disabled={disabled}
                size={size}
                fullWidth
                endIcon={endicon}
                onClick={onClick}>
                {title}
            </Button>
        </div>
    );
};
