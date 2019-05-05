import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import potions from '../potions';

import HerbloreCalculator from '../herblore';

describe('Herblore Calculator', () => {
    describe('rendering', () => {
        it('should match the default snapshot', () => {
            const { container } = render(<HerbloreCalculator />);

            expect(container).toMatchSnapshot();
        });
    });
    describe('calculation', () => {
        it('should properly calculate herblore exp', () => {
            const { attackPotion } = potions;

            const guamAmount = 25;
            const expectedExpGained = 25 * attackPotion.exp;

            const { container, getByText, getByTestId } = render(<HerbloreCalculator />);
            const guamInput = container.querySelector(`input[name="${attackPotion.herb}"]`);

            fireEvent.change(guamInput, { target: { value: guamAmount } });

            const expGainedEl = getByTestId('totalExp');
            expect(expGainedEl.innerHTML).toEqual(`In total you will gain ${expectedExpGained} herblore exp.`);
        });
    });
});
