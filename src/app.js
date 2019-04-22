import React, { useReducer, createContext, useContext } from 'react';

import { createGlobalStyle } from 'styled-components';

import EnsouledHeads from './pages/ensouled-heads/ensouled-heads';
import HomePage from './pages/home/home';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto');
    * { 
        font-family: 'Roboto', sans-serif;
    }
`;

const PAGES = {
    home: HomePage,
    ensouledHeadCalc: EnsouledHeads,
    herbloreCalc: () => <div>herblore calc</div>,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'PAGE_CHANGE': {
            return { ...state, page: action.page, pageProps: action.pageProps };
        }
        /* istanbul ignore next */
        default:
            return state;
    }
};

const initialState = { page: 'home' };

const DispatchContext = createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { page, pageProps } = state;

    const CurrentPage = PAGES[page];

    return (
        <DispatchContext.Provider value={dispatch}>
            <GlobalStyle />
            <CurrentPage dispatch={dispatch} {...pageProps} />
        </DispatchContext.Provider>
    );
}

export default App;

export const useDispatch = () => useContext(DispatchContext);
