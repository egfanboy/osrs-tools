import React from 'react';
import items from './items';
import { Image } from './wiki-image.styled';

const WikiImage = ({ src, title, alt, className, item }) => {
    const itemSrc = src ? src : items[item];
    return <Image title={title} alt={alt} className={className} src={`https://oldschool.runescape.wiki${itemSrc}`} />;
};

export default WikiImage;
