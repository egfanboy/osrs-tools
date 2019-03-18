import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

// Mocks for Electron
const mockSend = jest.fn();
const mockOnce = jest.fn();

global.mockSend = mockSend;
global.mockOnce = mockOnce;

const mockIpcRenderer = {
    send: mockSend,
    once: mockOnce,
};

global.window.require = function() {
    return {
        ipcRenderer: mockIpcRenderer,
    };
};
