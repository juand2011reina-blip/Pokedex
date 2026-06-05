import React from "react";
import PokemonCard from "./components/PokemonCard.jsx";
import "./App.css";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        if (!response.ok) throw new Error('Error al conectar con la PokéAPI.');
        const data = await response.json();
        
        const detailedRequests = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        });

        const detailedData = await Promise.all(detailedRequests);
        setPokemons(detailedData);
      } catch (err) {
        setError(err.message || 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(#2c3e50_1px,transparent_1px)] [background-size:16px_16px] text-white p-4 md:p-8 flex justify-center items-center">
      
      {/* CONTENEDOR PRINCIPAL DE LA POKÉDEX */}
      <div className="w-full max-w-6xl bg-red-600 border-8 border-red-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 relative overflow-hidden">
        
        {/* DETALLES DE LA PARTE SUPERIOR (CÁMARA Y LUCES) */}
        <div className="flex items-center gap-3 border-b-4 border-red-700 pb-5 mb-6">
          {/* Lente Azul Grande */}
          <div className="w-14 h-14 bg-sky-400 border-4 border-white rounded-full shadow-[0_0_15px_#38bdf8] animate-pulse"></div>
          {/* Luces Pequeñas (Semáforo) */}
          <div className="w-4 h-4 bg-red-500 border border-red-700 rounded-full"></div>
          <div className="w-4 h-4 bg-yellow-400 border border-yellow-600 rounded-full"></div>
          <div className="w-4 h-4 bg-green-500 border border-green-700 rounded-full"></div>
          {/* Línea decorativa de la Pokédex */}
          <div className="ml-auto h-2 w-1/3 bg-red-800 rounded-full opacity-50"></div>
        </div>

        {/* PANTALLA PRINCIPAL */}
        <div className="bg-zinc-800 border-4 border-zinc-700 rounded-2xl p-4 md:p-6 shadow-inner min-h-[60vh]">
          
          {/* Estado de Carga */}
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <div className="w-16 h-16 border-8 border-zinc-600 border-t-amber-400 rounded-full animate-spin mb-4"></div>
              <p className="text-xl font-mono text-amber-400 tracking-widest animate-pulse">ACCEDIENDO A LA BASE DE DATOS...</p>
            </div>
          )}

          {/* Estado de Error */}
          {error && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] bg-red-950/50 border border-red-500 p-6 rounded-xl font-mono">
              <p className="text-red-400 text-2xl font-bold mb-2">⚠ ERROR DE CONEXIÓN</p>
              <p className="text-zinc-300 text-center">{error}</p>
            </div>
          )}

          {/* Grid de Pokémon */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
              {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          )}
        </div>

        {/* CONTROLES INFERIORES DE LA POKÉDEX */}
        <div className="flex justify-between items-center mt-6 pt-2 border-t-4 border-red-700">
          {/* Botón Negro Grande (Pad Direccional simulado u opción) */}
          <div className="w-12 h-12 bg-zinc-900 rounded-full border-4 border-zinc-800 shadow-md"></div>
          {/* Luces alargadas de barras */}
          <div className="flex gap-4">
            <div className="w-12 h-3 bg-indigo-600 rounded-full shadow-inner"></div>
            <div className="w-12 h-3 bg-emerald-600 rounded-full shadow-inner"></div>
          </div>
          {/* Rejilla de Ventilación / Altavoz */}
          <div className="flex flex-col gap-1 w-16">
            <div className="h-1 bg-zinc-900/40 rounded"></div>
            <div className="h-1 bg-zinc-900/40 rounded"></div>
            <div className="h-1 bg-zinc-900/40 rounded"></div>
          </div>
        </div>

      </div>
    </div>
  );
}