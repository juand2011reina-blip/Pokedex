import React, { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard.jsx';

export default function App() {
  // 1. Estados requeridos
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect para consumir la API al montar el componente
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null); // Limpiar errores previos

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        
        if (!response.ok) {
          throw new Error('No se pudo conectar con el servidor de Pokémon.');
        }

        const data = await response.json();

        // Como la primera API solo da nombre y URL, entramos a cada URL para traer los detalles (imagen, id)
        const detailedRequests = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        });

        // Esperamos a que todas las peticiones secundarias terminen
        const detailedData = await Promise.all(detailedRequests);
        
        setPokemons(detailedData);
      } catch (err) {
        setError(err.message || 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []); // Array de dependencias vacío para que solo se ejecute una vez

  // 3. Renderizado Condicional
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 drop-shadow">
          PokéDex
        </h1>
        <p className="text-gray-400 mt-2">Primeros 20 resultados de la PokeAPI</p>
      </header>

      {/* Caso de Carga */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mb-4"></div>
          <p className="text-xl font-medium text-amber-400 animate-pulse">Cargando Pokémon...</p>
        </div>
      )}

      {/* Caso de Error */}
      {error && (
        <div className="max-w-md mx-auto bg-red-900/40 border border-red-500/50 rounded-xl p-6 text-center shadow-2xl backdrop-blur-sm">
          <p className="text-red-400 font-semibold text-lg mb-2">⚠ Error</p>
          <p className="text-gray-200">{error}</p>
        </div>
      )}

      {/* Renderizado de la lista usando .map() */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}