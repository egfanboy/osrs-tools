import React from 'react';

import { TileList } from '../../components/tile-list';
import { Main, Instructions } from './home.styled';

const HomePage = () => {
    return (
        <Main>
            <Instructions>
                Welcome to OSRS Tools, you can select a tool from the list below to get started.
            </Instructions>
            <TileList />
        </Main>
    );
};

export default HomePage;
