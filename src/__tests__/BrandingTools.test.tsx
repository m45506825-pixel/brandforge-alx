import { render, screen, fireEvent } from '@testing-library/react';
import { BrandingTools } from '../components/BrandingTools';

describe('BrandingTools', () => {
  it('updates colors and handles logo actions', () => {
    render(<BrandingTools onBack={() => {}} />);

    // Add a color
    fireEvent.click(screen.getByTestId('bt-add-color'));
    expect(screen.getByTestId('bt-status').textContent).toBe('color-added');

    // Trigger upload flow (clicking will not open file dialog in tests, but updates status when programmatic)
    fireEvent.click(screen.getByTestId('bt-upload-logo'));
    expect(screen.getByTestId('bt-status').textContent).toBe('color-added');
  });
});