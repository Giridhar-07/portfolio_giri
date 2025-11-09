import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

/**
 * ThemeContext tests
 * Validates dark/light mode toggling via the context provider.
 */
describe('ThemeContext', () => {
  /**
   * Test component to expose theme state and toggle for assertions.
   */
  const TestComp: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
      <button onClick={toggleTheme} data-testid="toggle">
        {isDarkMode ? 'dark' : 'light'}
      </button>
    );
  };

  /**
   * Toggles theme state and verifies UI updates.
   */
  it('toggles between light and dark mode', () => {
    render(
      <ThemeProvider>
        <TestComp />
      </ThemeProvider>
    );

    const btn = screen.getByTestId('toggle');
    expect(btn.textContent).toBe('light');
    fireEvent.click(btn);
    expect(btn.textContent).toBe('dark');
    fireEvent.click(btn);
    expect(btn.textContent).toBe('light');
  });
});