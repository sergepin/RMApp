import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CharacterListItem } from '../CharacterListItem';
import { Character } from '../../../types/character';

// Mock the hooks
vi.mock('../../../hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: vi.fn((id: number) => id === 1),
    toggleFavorite: vi.fn(),
  }),
}));

vi.mock('../../../hooks/useSoftDelete', () => ({
  useSoftDelete: () => ({
    softDeleteCharacter: vi.fn(),
  }),
}));

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  status: 'Alive',
  gender: 'Male',
  origin: 'Earth',
  image: 'https://example.com/rick.jpg'
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('CharacterListItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders character information correctly', () => {
    renderWithRouter(
      <CharacterListItem 
        character={mockCharacter} 
        isSelected={false}
        onClick={vi.fn()}
        onSoftDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  it('displays character image with fallback', () => {
    renderWithRouter(
      <CharacterListItem 
        character={mockCharacter} 
        isSelected={false}
        onClick={vi.fn()}
        onSoftDelete={vi.fn()}
      />
    );

    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/rick.jpg');
  });

  it('calls onClick when character item is clicked', () => {
    const mockOnClick = vi.fn();
    
    renderWithRouter(
      <CharacterListItem 
        character={mockCharacter} 
        isSelected={false}
        onClick={mockOnClick}
        onSoftDelete={vi.fn()}
      />
    );

    const characterItem = screen.getByText('Rick Sanchez').closest('div');
    fireEvent.click(characterItem!);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('calls onSoftDelete when delete button is clicked', () => {
    const mockOnSoftDelete = vi.fn();
    
    renderWithRouter(
      <CharacterListItem 
        character={mockCharacter} 
        isSelected={false}
        onClick={vi.fn()}
        onSoftDelete={mockOnSoftDelete}
      />
    );

    const deleteButton = screen.getByLabelText('Soft delete character');
    fireEvent.click(deleteButton);

    expect(mockOnSoftDelete).toHaveBeenCalledWith(1);
  });

  it('shows favorite heart when character is favorited', () => {
    renderWithRouter(
      <CharacterListItem 
        character={mockCharacter} 
        isSelected={false}
        onClick={vi.fn()}
        onSoftDelete={vi.fn()}
      />
    );

    // Since our mock returns true for id === 1, this should show the filled heart
    const favoriteButton = screen.getByLabelText('Remove from favorites');
    expect(favoriteButton).toBeInTheDocument();
  });
});