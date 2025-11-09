/**
 * Test environment setup
 * Configures Testing Library matchers and any global test setup.
 */
import { expect, vi } from 'vitest';
// Bind Vitest's expect to global before extending with jest-dom
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).expect = expect;
import '@testing-library/jest-dom/vitest';

// Polyfill window.matchMedia for jsdom environment
if (typeof window !== 'undefined' && !('matchMedia' in window)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}