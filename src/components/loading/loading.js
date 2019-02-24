import React from 'react';

import { Spinner } from './loading.styled';

const Loading = ({ height = 100 }) => (
    <svg viewBox="0 0 82 82" height={`${height}px`}>
        <Spinner
            className="basic-spinner"
            fill="none"
            cx="41"
            cy="41"
            r="33"
        />
    </svg>
);

export default Loading;
