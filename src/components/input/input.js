import React, { useState } from 'react';

import {
    StyledInput,
    Container,
    Error,
} from './input.styled';

const handleChange = ({ onChange }) => e => {
    onChange && onChange(e.target.value);
};

const Input = props => {
    const {
        value,
        type = 'text',
        min,
        max,
        label,
        className,
        error,
        name,
    } = props;

    const [focused, setFocus] = useState(false);

    return (
        <Container
            label={label}
            focused={focused}
            value={value}
            error={error}
            className={className}
        >
            <StyledInput
                name={name || label}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                type={type}
                value={value}
                min={min}
                max={max}
                onChange={handleChange(props)}
            />
            <Error>{error}</Error>
        </Container>
    );
};

export default Input;
