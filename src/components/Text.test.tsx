import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PhotoFrame } from './PhotoFrame';
import { T } from './Text';

describe('<T> placeholders', () => {
  it('highlights [KT: …] placeholders', () => {
    const { container } = render(<T>{'Hello [KT: name] there'}</T>);
    expect(container.querySelector('.todo')?.textContent).toBe('[KT: name]');
    expect(container.textContent).toBe('Hello [KT: name] there');
  });
  it('renders plain text untouched', () => {
    const { container } = render(<T>{'Just text'}</T>);
    expect(container.querySelector('.todo')).toBeNull();
  });
});

describe('<PhotoFrame>', () => {
  it('shows a labelled placeholder when no photo is set', () => {
    const { getByText } = render(<PhotoFrame photo={{ id: 'x', alt: 'alt', placeholder: 'PHOTO — FIRST DATE' }} />);
    expect(getByText('PHOTO — FIRST DATE')).toBeTruthy();
    expect(getByText('add photo here')).toBeTruthy();
  });
  it('renders a real image with alt text and lazy loading', () => {
    const { container } = render(<PhotoFrame photo={{ id: 'x', alt: 'Grace laughing', src: 'images/raw/test.jpg' }} />);
    const img = container.querySelector('img.photo__img')!;
    expect(img.getAttribute('alt')).toBe('Grace laughing');
    expect(img.getAttribute('loading')).toBe('lazy');
  });
});
