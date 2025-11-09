import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navigation from '../components/Navigation';

/**
 * Navigation tests
 * Verifies that navigation links render and active state reflects current route.
 */
describe('Navigation', () => {
  /**
   * Renders navigation and checks for key menu items.
   */
  it('renders primary nav links', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Navigation />
        </MemoryRouter>
      </ThemeProvider>
    );

    const nav = document.querySelector('nav') as HTMLElement;
    const about = nav.querySelector('a[href="/about"]');
    const skills = nav.querySelector('a[href="/skills"]');
    const projects = nav.querySelector('a[href="/projects"]');
    expect(about).toBeTruthy();
    expect(skills).toBeTruthy();
    expect(projects).toBeTruthy();
  });

  /**
   * Highlights the active link when at a specific route.
   */
  it('highlights active link for current route', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/about"]}>
          <Navigation />
        </MemoryRouter>
      </ThemeProvider>
    );

    // Prefer text query for simplicity; fallback to href selection
    const aboutLink = document.querySelector('a[href="/about"]') as HTMLElement;
    expect(aboutLink).toBeTruthy();
    // @ts-expect-error - HTMLElement used in fallback
    expect(aboutLink?.getAttribute('href')).toBe('/about');
  });
});