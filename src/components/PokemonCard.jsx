import React from 'react';

export default function PokemonCard({ pokemon }) {
  // Protección: Si por algún motivo el objeto pokemon no ha llegado bien, no renderizamos nada roto
  if (!pokemon || !pokemon.sprites) return null;

  // Fallback de imagen: Si no hay arte oficial, usamos el sprite clásico frontal
  const pokemonImage = 
    pokemon.sprites.other?.['official-artwork']?.front_default || 
    pokemon.sprites.front_default || 
    'https://via.placeholder.com/150?text=No+Image';

  return (
    <div className="bg-zinc-900 border-4 border-zinc-950 rounded-xl p-4 flex flex-col items-center relative shadow-[0_4px_0_#000] hover:translate-y-1 hover:shadow-none transition-all duration-100">
      
      {/* Mini LED decorativo */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>

      {/* Contenedor de la Imagen */}
      <div className="w-full bg-emerald-950 border-2 border-zinc-700 rounded-lg p-3 flex items-center justify-center bg-[radial-gradient(#14532d_1px,transparent_1px)] [background-size:8px_8px] shadow-inner">
        <img 
          src={pokemonImage} 
          alt={pokemon.name || 'Pokémon'}
          className="w-28 h-28 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] transform hover:scale-110 transition-transform"
          loading="lazy" // Optimización de carga de imágenes
        />
      </div>
      
      {/* Sección de Datos */}
      <div className="w-full mt-3 font-mono text-left bg-zinc-800 p-2 border border-zinc-700 rounded">
        <p className="text-xs text-amber-400 font-bold tracking-wider">
          Nº {String(pokemon.id || 0).padStart(3, '0')}
        </p>
        
        <h3 className="text-lg font-black capitalize text-white truncate mt-0.5 border-b border-zinc-700 pb-1">
          {pokemon.name || 'Desconocido'}
        </h3>

        {/* Renderizado seguro de los tipos con encadenamiento opcional */}
        <div className="flex flex-wrap gap-1 mt-2">
          {pokemon.types?.map((typeInfo, index) => (
            <span 
              key={`${pokemon.id}-type-${index}`} // Key única y combinada
              className="text-[10px] font-sans font-bold uppercase px-2 py-0.5 bg-zinc-700 rounded text-zinc-300 border border-zinc-600"
            >
              {typeInfo.type?.name}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}