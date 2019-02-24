import styled, { css } from 'styled-components';

import colors from '../../utils/styles/colors';

const buttonColors = Object.assign({}, colors, {
    primary: {
        ...colors.primary,
        focus: 'rgb(123,54,240)',
    },
    error: {
        normal: colors.error,
        light: 'rgb(210,60,50)',
        focus: 'rgb(220,60,50)',
    },
    warning: {
        normal: colors.warning,
        light: 'rgb(260,190,55)',
        focus: 'rgb(255,200,50)',
    },
});

const getButtonCSS = ({ disabled }) => {
    if (disabled) return disabledStyle;

    return normalStyle;
};

const getBackgroundColor = context =>
    buttonColors.primary[context];

const smallSize = css`
    width: 75px;
    height: 35px;
`;
const mediumSize = css`
    width: 100px;
    height: 35px;
`;
const largeSize = css`
    width: 150px;
    height: 35px;
`;

const BUTTON_SIZES = {
    small: smallSize,
    medium: mediumSize,
    large: largeSize,
};

const disabledStyle = css`
    background-color: rgba(197, 197, 197, 0.8);
    border: none;
    box-shadow: none;
    color: ${buttonColors.text.secondary};
    cursor: not-allowed;
`;

const normalStyle = css`
    background-color: ${props =>
        getBackgroundColor('normal', props)};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
    color: white;
    &:hover {
        cursor: pointer;
        color: white;
        background-color: ${props =>
            getBackgroundColor('light', props)};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    }
    &:focus {
        background-color: ${props =>
            getBackgroundColor(
                props.focused ? 'focus' : 'normal',
                props
            )};
        outline: none;
    }
`;

export const ButtonContent = styled.div`
    display: flex;
    text-transform: uppercase;
    align-items: center;
    justify-content: ${({ size }) =>
        size === 'large' ? 'space-evenly' : 'space-around'};
    letter-spacing: 0.15em;
    user-select: none;
`;

export const StyledButton = styled.button`
    border-radius: 4px;
    ${({ size }) => BUTTON_SIZES[size]};
    margin: 5px;
    border-color: transparent;
    transition: all 0.2s;
    ${getButtonCSS};
`;
