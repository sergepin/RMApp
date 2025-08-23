import { Op } from 'sequelize';
import Character from '../models/Character';
import resolvers from '../graphql/resolvers';
import { getOrSetCache, buildCacheKey } from '../utils/cache';

jest.mock('../models/Character');
jest.mock('../utils/cache');
jest.mock('../decorators/timing', () => ({
  timing: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => descriptor
}));

const mockCharacter = Character as jest.Mocked<typeof Character>;
const mockGetOrSetCache = getOrSetCache as jest.MockedFunction<typeof getOrSetCache>;
const mockBuildCacheKey = buildCacheKey as jest.MockedFunction<typeof buildCacheKey>;

describe('Character Search', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBuildCacheKey.mockReturnValue('test-cache-key');
  });

  it('should search characters by name', async () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive' }
    ];
    
    mockGetOrSetCache.mockImplementation(async (key, fetchData) => {
      const result = await fetchData();
      return result;
    });
    
    mockCharacter.findAll.mockResolvedValue(mockCharacters as any);

    const result = await resolvers.Query.characters({}, { name: 'Rick' });

    expect(mockCharacter.findAll).toHaveBeenCalledWith({
      where: {
        name: { [Op.iLike]: '%Rick%' }
      }
    });
    expect(result).toEqual(mockCharacters);
  });

  it('should search characters by status', async () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive' }
    ];
    
    mockGetOrSetCache.mockImplementation(async (key, fetchData) => {
      const result = await fetchData();
      return result;
    });
    
    mockCharacter.findAll.mockResolvedValue(mockCharacters as any);

    const result = await resolvers.Query.characters({}, { status: 'Alive' });

    expect(mockCharacter.findAll).toHaveBeenCalledWith({
      where: {
        status: { [Op.iLike]: 'Alive' }
      }
    });
    expect(result).toEqual(mockCharacters);
  });

  it('should search characters by species', async () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive' }
    ];
    
    mockGetOrSetCache.mockImplementation(async (key, fetchData) => {
      const result = await fetchData();
      return result;
    });
    
    mockCharacter.findAll.mockResolvedValue(mockCharacters as any);

    const result = await resolvers.Query.characters({}, { species: 'Human' });

    expect(mockCharacter.findAll).toHaveBeenCalledWith({
      where: {
        species: { [Op.iLike]: 'Human' }
      }
    });
    expect(result).toEqual(mockCharacters);
  });

  it('should search with multiple filters', async () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive' }
    ];
    
    mockGetOrSetCache.mockImplementation(async (key, fetchData) => {
      const result = await fetchData();
      return result;
    });
    
    mockCharacter.findAll.mockResolvedValue(mockCharacters as any);

    const result = await resolvers.Query.characters({}, { 
      name: 'Rick', 
      status: 'Alive', 
      species: 'Human' 
    });

    expect(mockCharacter.findAll).toHaveBeenCalledWith({
      where: {
        name: { [Op.iLike]: '%Rick%' },
        status: { [Op.iLike]: 'Alive' },
        species: { [Op.iLike]: 'Human' }
      }
    });
    expect(result).toEqual(mockCharacters);
  });

  it('should return empty array when no results found', async () => {
    mockGetOrSetCache.mockImplementation(async (key, fetchData) => {
      const result = await fetchData();
      return result;
    });
    
    mockCharacter.findAll.mockResolvedValue([]);

    const result = await resolvers.Query.characters({}, { name: 'NonExistent' });

    expect(result).toEqual([]);
  });

  it('should return all characters when no filters provided', async () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive' },
      { id: 2, name: 'Morty Smith', species: 'Human', status: 'Alive' }
    ];
    
    mockGetOrSetCache.mockResolvedValue(mockCharacters);

    const result = await resolvers.Query.characters({}, {});

    expect(result).toEqual(mockCharacters);
  });
});
