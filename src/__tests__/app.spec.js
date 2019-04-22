import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import App from '../app';

describe('App', () => {
    it('should not throw an error on mount', () => {
        expect(() => render(<App />)).not.toThrow();
    });

    it('should render the herblore calculator when the tile is clicked', () => {
        const { getByText } = render(<App />);

        fireEvent.click(getByText('Herblore Calculator'));

        expect(() => getByText('herblore calc')).not.toThrow();
    });

    it('should render the herblore calculator when the tile is clicked', () => {
        const { getByText } = render(<App />);

        fireEvent.click(getByText('Ensouled Head Calculator'));

        expect(() => getByText('Ensouled head calculator')).not.toThrow();
    });
});
