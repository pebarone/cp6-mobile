import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { pokeApi } from '../services/pokeApi';

interface PokemonCardProps {
  name: string;
  url: string;
  onPress: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ name, url, onPress }) => {
  const pokemonId = pokeApi.getPokemonIdFromUrl(url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.id}>#{pokemonId.padStart(3, '0')}</Text>
        <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    alignItems: 'center',
    marginTop: 8,
  },
  id: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
});
