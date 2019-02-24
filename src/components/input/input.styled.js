import styled, { css } from 'styled-components';

import colors from '../../utils/styles/colors';

const getLabelPostion = ({ focused, value }) => {
    if (
        (value && !focused) ||
        (focused && value) ||
        (!value && focused)
    )
        return css`
            margin-top: -25px;
            left: 10px;
            font-size: 14px;
            background-color: white;
        `;
};

export const Container = styled.div`
    position: relative;
    display: flex;
    margin: 8px;
    &:after {
        content: ${({ label, value, focused }) =>
            (label && !(value && !focused)) ||
            (label && !focused && value)
                ? `'${label}'`
                : ''};
        position: absolute;

        left: 20px;
        top: 50%;
        margin-top: -10px;

        ${getLabelPostion};

        transition: all 0.4s;
    }

    ${props => {
        if (props.error) {
            return css`
                ${Error} {
                    visibility: visible;
                }

                ${StyledInput} {
                    border-color: ${colors.error};
                    &:focus {
                        border-color: ${colors.error};
                    }
                }
            `;
        }
    }};
`;

export const Error = styled.span`
    position: absolute;
    visibility: hidden;
    bottom: -15px;
    right: 0px;
    font-size: 12px;
    color: ${colors.error};
`;

export const StyledInput = styled.input`
    position: relative;
    box-sizing: border-box;
    padding: 4px 8px;
    border-radius: 4px;

    width: 100%;
    border: solid 1px ${colors.text.secondary};
    caret-color: ${colors.primary.normal};
    font-size: 14px;
    height: 40px;

    &:focus {
        outline: none;
        border-color: ${colors.primary.normal};
    }
`;
