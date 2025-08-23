import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

const defaultProps = {
  searchTerm: '',
  onSearchChange: vi.fn(),
  onSortToggle: vi.fn(),
  sortOrder: 'asc' as const,
  showAdvancedFilters: false,
  onToggleAdvancedFilters: vi.fn(),
  characterFilter: 'all' as const,
  onCharacterFilterChange: vi.fn(),
  speciesFilter: 'all' as const,
  onSpeciesFilterChange: vi.fn(),
};

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with placeholder', () => {
    render(<SearchBar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search or filter results');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearchChange when typing in search input', () => {
    const mockOnSearchChange = vi.fn();
    
    render(<SearchBar {...defaultProps} onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search or filter results');
    fireEvent.change(searchInput, { target: { value: 'Rick' } });
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('Rick');
  });

  it('calls onSortToggle when sort button is clicked', () => {
    const mockOnSortToggle = vi.fn();
    
    render(<SearchBar {...defaultProps} onSortToggle={mockOnSortToggle} />);
    
    const sortButton = screen.getByLabelText(/Sort descending/i);
    fireEvent.click(sortButton);
    
    expect(mockOnSortToggle).toHaveBeenCalled();
  });

});