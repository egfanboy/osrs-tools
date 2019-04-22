import React, { createContext, useContext as mockUseContext } from 'react';
import { render, fireEvent } from 'react-testing-library';

import TileList from '../tile-list';
const mockDispatch = createContext();

jest.mock('../../../app', () => ({ useDispatch: jest.fn(() => mockUseContext(mockDispatch)) }));

describe('Tile List', () => {
    describe('rendering', () => {
        it('should match the default snapshot', () => {
            const { container } = render(<TileList />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('Actions', () => {
        it('should call the dispatch with the proper page change action from context when a tile is clicked', () => {
            const Context = mockDispatch;
            const dispatch = jest.fn();
            const { getByText } = render(
                <Context.Provider value={dispatch}>
                    <TileList />
                </Context.Provider>
            );

            fireEvent.click(getByText('Herblore Calculator'));
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({ type: 'PAGE_CHANGE', page: 'herbloreCalc' });

            fireEvent.click(getByText('Ensouled Head Calculator'));
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({ type: 'PAGE_CHANGE', page: 'ensouledHeadCalc' });
        });
    });
});
