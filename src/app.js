import React from 'react';

import { createGlobalStyle } from 'styled-components';

import EnsouledHeads from './pages/ensouled-heads/ensouled-heads';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto');
    * { 
        font-family: 'Roboto', sans-serif;
    }
`;

export default class App extends React.Component {
    render() {
        return (
            <>
                <GlobalStyle />
                <EnsouledHeads />
            </>
        );
    }
}
