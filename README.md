# Pokédex App - CP6 Mobile

Aplicativo de Pokédex desenvolvido com React Native, Expo e TypeScript para o Checkpoint 6 da disciplina Mobile App Development.

## 📱 Funcionalidades

- **Tela Principal (Home)**: Lista de pokémons com cards visuais
- **Tela de Detalhes**: Informações completas sobre cada pokémon
  - Imagem oficial
  - Tipos
  - Altura, peso e experiência base
  - Estatísticas base com barras visuais
  - Habilidades

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **PokéAPI** - API REST para dados dos pokémons

## 📂 Estrutura do Projeto

```
cp6-mobile/
├── src/
│   ├── components/
│   │   └── PokemonCard.tsx       # Card do pokémon na lista
│   ├── screens/
│   │   ├── HomeScreen.tsx        # Tela principal com lista
│   │   └── DetailsScreen.tsx     # Tela de detalhes
│   ├── services/
│   │   └── pokeApi.ts            # Serviço de comunicação com API
│   └── types/
│       ├── pokemon.ts            # Tipos TypeScript da API
│       └── navigation.ts         # Tipos de navegação
├── App.tsx                       # Componente principal
├── package.json
└── tsconfig.json
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- npm ou yarn
- Expo Go instalado no celular (Android/iOS)

### Instalação e Execução

1. Instale as dependências (se ainda não instaladas):
```bash
npm install
```

2. Inicie o projeto:
```bash
npx expo start
```

3. Escaneie o QR Code com o aplicativo Expo Go para visualizar no celular.

## 📦 Dependências Principais

- `expo` - SDK do Expo
- `react-native` - Framework React Native
- `@react-navigation/native` - Biblioteca de navegação
- `@react-navigation/native-stack` - Stack navigator
- `react-native-screens` - Otimização de telas
- `react-native-safe-area-context` - Área segura

## 🎨 Design

O aplicativo utiliza:
- Cores temáticas baseadas nos tipos de pokémon
- Interface responsiva e intuitiva
- Cards visuais com imagens oficiais
- Animações suaves de navegação

## 📝 API Utilizada

**PokéAPI**: https://pokeapi.co/

Endpoints utilizados:
- `GET /pokemon?limit=50&offset=0` - Lista de pokémons
- `GET /pokemon/{id ou name}` - Detalhes do pokémon

