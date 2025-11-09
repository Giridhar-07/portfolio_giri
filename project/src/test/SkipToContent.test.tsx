import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkipToContent from '../components/SkipToContent';

/**
 * SkipToContent tests
 * Ensures the accessible skip link is present and correctly configured.
 */
describe('SkipToContent', () => {
  /**
   * Verifies skip link href and text content.
   */
  it('renders skip link with correct href', () => {
    render(<SkipToContent />);
    const link = screen.getByText('Skip to content');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#content');
  });
});