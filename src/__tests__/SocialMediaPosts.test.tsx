import { render, screen, fireEvent } from '@testing-library/react';
import { SocialMediaPosts } from '../components/SocialMediaPosts';

describe('SocialMediaPosts', () => {
  it('selects platform and post type, edits caption, and triggers actions', () => {
    render(<SocialMediaPosts onBack={() => {}} />);

    fireEvent.click(screen.getByTestId('sm-platform-linkedin'));
    fireEvent.click(screen.getByTestId('sm-posttype-article'));

    const caption = screen.getByTestId('sm-caption') as HTMLTextAreaElement;
    fireEvent.change(caption, { target: { value: 'Hello world' } });
    expect(caption.value).toBe('Hello world');

    fireEvent.click(screen.getByTestId('sm-copy'));
    fireEvent.click(screen.getByTestId('sm-download'));
    fireEvent.click(screen.getByTestId('sm-schedule'));
    fireEvent.click(screen.getByTestId('sm-connect'));

    expect(screen.getByTestId('sm-status').textContent).not.toEqual('');
  });
});