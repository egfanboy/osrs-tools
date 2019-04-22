import React from 'react';
import { render } from 'react-testing-library';

import HomePage from '../home';

describe('home page', () => {
    describe('rendering', () => {
        it('should match the default snapshot', () => {
            const { container } = render(<HomePage />);

            expect(container).toMatchSnapshot();
        });
    });
});
