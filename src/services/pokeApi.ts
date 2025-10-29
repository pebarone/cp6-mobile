import { PokemonListResponse, PokemonDetail } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokeApi = {
  // Buscar lista de pokémons
  getPokemonList: async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar lista de pokémons');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  // Buscar detalhes de um pokémon específico
  getPokemonDetail: async (nameOrId: string | number): Promise<PokemonDetail> => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do pokémon');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  // Extrair ID do pokémon a partir da URL
  getPokemonIdFromUrl: (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  },
};
