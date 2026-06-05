import React from 'react';

export default function PokemonCard({ pokemon }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 shadow-lg">
      {/* Número de Pokédex con formato #001 */}
      <span className="text-xs font-mono text-gray-400 self-start">
        #{String(pokemon.id).padStart(3, '0')}
      </span>
      
      {/* Imagen del Pokémon */}
      <img 
        src={pokemon.sprites.other['official-artwork'].front_default} 
        alt={pokemon.name}
        className="w-32 h-32 object-contain drop-shadow-md my-2"
      />
      
      {/* Nombre del Pokémon */}
      <h3 className="text-xl font-bold capitalize text-white tracking-wide">
        {pokemon.name}
      </h3>
    </div>
  );
}