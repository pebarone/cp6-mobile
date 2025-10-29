import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { pokeApi } from '../services/pokeApi';
import { PokemonDetail } from '../types/pokemon';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const TYPE_COLORS: { [key: string]: string } = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { pokemonName } = route.params;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPokemonDetails();
  }, []);

  const loadPokemonDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokeApi.getPokemonDetail(pokemonName);
      setPokemon(data);
    } catch (err) {
      setError('Erro ao carregar detalhes do pokémon.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#DC0A2D" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Pokémon não encontrado'}</Text>
      </View>
    );
  }

  const mainType = pokemon.types[0].type.name;
  const backgroundColor = TYPE_COLORS[mainType] || '#A8A878';

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.pokemonName}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Text style={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Text>
        </View>
        <Image
          source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Tipos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipos</Text>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type) => (
              <View
                key={type.slot}
                style={[
                  styles.typeTag,
                  { backgroundColor: TYPE_COLORS[type.type.name] || '#A8A878' },
                ]}
              >
                <Text style={styles.typeText}>
                  {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Informações Básicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Altura</Text>
              <Text style={styles.infoValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Peso</Text>
              <Text style={styles.infoValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Experiência</Text>
              <Text style={styles.infoValue}>{pokemon.base_experience}</Text>
            </View>
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas Base</Text>
          {pokemon.stats.map((stat) => (
            <View key={stat.stat.name} style={styles.statRow}>
              <Text style={styles.statName}>
                {stat.stat.name.replace('-', ' ').toUpperCase()}
              </Text>
              <View style={styles.statBarContainer}>
                <View
                  style={[
                    styles.statBar,
                    { width: `${(stat.base_stat / 255) * 100}%`, backgroundColor },
                  ]}
                />
              </View>
              <Text style={styles.statValue}>{stat.base_stat}</Text>
            </View>
          ))}
        </View>

        {/* Habilidades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.abilitiesContainer}>
            {pokemon.abilities.map((ability) => (
              <View key={ability.slot} style={styles.abilityTag}>
                <Text style={styles.abilityText}>
                  {ability.ability.name.replace('-', ' ')}
                  {ability.is_hidden ? ' (Oculta)' : ''}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerInfo: {
    marginTop: 10,
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  pokemonId: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  mainImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    width: 80,
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    width: 35,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityTag: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  abilityText: {
    color: '#333',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  errorText: {
    fontSize: 16,
    color: '#DC0A2D',
    textAlign: 'center',
  },
});
