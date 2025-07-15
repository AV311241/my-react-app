// jest.setup.js
import '@testing-library/jest-dom';

// Polyfill TextEncoder/Decoder explicitly
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
