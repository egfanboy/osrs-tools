import React from 'react';
import { render } from 'react-testing-library';

import App from '../app';

describe('App', () => {
    it('should not throw an error on mount', () => {
        expect(() => render(<App />)).not.toThrow();
    });
});
