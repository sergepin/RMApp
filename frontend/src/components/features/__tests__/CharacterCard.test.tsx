import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CharacterCard } from '../CharacterCard';
import { Character } from '../../../types/character';

// Mock the storage utility
vi.mock('../../../utils/storage', () => ({
  storage: {
    isFavorite: vi.fn(),
    toggleFavorite: vi.fn(),
  },
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

describe('CharacterCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders character information correctly', () => {
    renderWithRouter(
      <CharacterCard 
        character={mockCharacter} 
        onFavoriteToggle={vi.fn()} 
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  it('displays character image with fallback', () => {
    renderWithRouter(
      <CharacterCard 
        character={mockCharacter} 
        onFavoriteToggle={vi.fn()} 
      />
    );

    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/rick.jpg');
  });

  it('calls onFavoriteToggle when favorite button is clicked', () => {
    const mockOnFavoriteToggle = vi.fn();
    
    renderWithRouter(
      <CharacterCard 
        character={mockCharacter} 
        onFavoriteToggle={mockOnFavoriteToggle} 
      />
    );

    const favoriteButton = screen.getByLabelText(/add to favorites/i);
    fireEvent.click(favoriteButton);

    expect(mockOnFavoriteToggle).toHaveBeenCalledWith(1);
  });

  it('renders correct status color based on status', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' };
    
    renderWithRouter(
      <CharacterCard 
        character={deadCharacter} 
        onFavoriteToggle={vi.fn()} 
      />
    );

    const statusElement = screen.getByText('Dead');
    expect(statusElement).toBeInTheDocument();
  });
});