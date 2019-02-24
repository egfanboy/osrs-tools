import React from 'react';

import { Image } from './wiki-image.styled';

const WikiImage = ({ src, title, alt, className }) => (
    <Image
        title={title}
        alt={alt}
        className={className}
        src={`https://oldschool.runescape.wiki${src}`}
    />
);

export default WikiImage;
