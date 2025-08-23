export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  origin: string;
  image: string;
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
}

export interface Comment {
  id: string;
  characterId: number;
  text: string;
  createdAt: Date;
}
