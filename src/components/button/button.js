import React, { useState } from 'react';

import {
    StyledButton,
    ButtonContent,
} from './button.styled';

const Button = props => {
    const {
        label,
        className,
        disabled,
        size = 'large',
        onClick,
    } = props;

    const [focused, setFocus] = useState(false);

    return (
        <StyledButton
            size={size}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={className}
            onClick={e => {
                onClick && onClick(e);
                setFocus(false);
            }}
            disabled={disabled}
            focused={focused}
        >
            <ButtonContent>{label}</ButtonContent>
        </StyledButton>
    );
};

export default Button;
