import React from 'react';

import { useDispatch } from '../../app';
import { Container, Tile, TileTitle, TileDescription, TileActions, TileTitleContainer } from './tile-list.styled';

const SkillTile = ({ title, description, actions, onTileClick }) => (
    <Tile onClick={onTileClick}>
        <TileTitleContainer>
            <TileTitle>{title}</TileTitle>
        </TileTitleContainer>
        <TileDescription>{description}</TileDescription>
        {actions && <TileActions>{actions}</TileActions>}
    </Tile>
);

const List = () => {
    const dispatch = useDispatch();

    const tiles = [
        {
            key: 'herblore-calc',
            description:
                'Calculate how much herblore exp you have with your herbs or calculate the amount of money required to gain a certain amount of exp',
            title: 'Herblore Calculator',
            onTileClick() {
                dispatch({ type: 'PAGE_CHANGE', page: 'herbloreCalc' });
            },
        },
        {
            key: 'ensouled-head-calc',
            description: 'Calculate how much prayer and magic exp you will gain with all your ensouled heads',
            title: 'Ensouled Head Calculator',
            onTileClick() {
                dispatch({ type: 'PAGE_CHANGE', page: 'ensouledHeadCalc' });
            },
        },
    ];

    return (
        <Container>
            {tiles.map(tile => (
                <SkillTile {...tile} />
            ))}
        </Container>
    );
};

export default List;
