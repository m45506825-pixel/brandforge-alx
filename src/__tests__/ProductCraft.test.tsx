import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ProductCraft } from '../components/ProductCraft';

describe('ProductCraft', () => {
  it('handles tool selection, background change, and actions', () => {
    render(<ProductCraft onBack={() => {}} />);

    // Open Background tool to reveal background options
    fireEvent.click(screen.getByTestId('pc-tool-background'));

    // Change background
  const bgBtn = screen.getByTestId('pc-bg-clean-white');
    fireEvent.click(bgBtn);

    // Click undo/redo/save
    fireEvent.click(screen.getByTestId('pc-undo'));
    fireEvent.click(screen.getByTestId('pc-redo'));
    fireEvent.click(screen.getByTestId('pc-save'));

    expect(screen.getByTestId('pc-status').textContent).not.toEqual('');
  });
});