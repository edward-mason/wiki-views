import React, { useState } from 'react';
import SearchInput from './components/SearchInput';
import StatsCard from './components/StatsCard';
import { fetchLifetimeViews } from './services/wikiService';
import { ProcessedStats } from './types';
import { Globe, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ProcessedStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchLifetimeViews(term);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 flex flex-col font-sans text-slate-900">
      
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8 flex justify-center border-b border-slate-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                <Globe size={18} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">WikiView</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-4 py-12 md:py-20 w-full max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className={`transition-all duration-500 ease-in-out flex flex-col items-center w-full ${data ? 'mb-12' : 'mb-0 flex-grow justify-center'}`}>
          <div className="text-center mb-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Visualize Wikipedia <br/>
              <span className="text-brand-600">Lifetime Traffic</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Enter any English Wikipedia article title below to reveal its total pageviews since July 2015.
            </p>
          </div>

          <SearchInput onSearch={handleSearch} isLoading={loading} />

          {/* Quick Examples - Only show when no data is loaded */}
          {!data && !loading && !error && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
              <span>Try:</span>
              <button onClick={() => handleSearch('Taylor Swift')} className="hover:text-brand-600 hover:underline">Taylor Swift</button>
              <span>•</span>
              <button onClick={() => handleSearch('Artificial intelligence')} className="hover:text-brand-600 hover:underline">Artificial intelligence</button>
              <span>•</span>
              <button onClick={() => handleSearch('Bitcoin')} className="hover:text-brand-600 hover:underline">Bitcoin</button>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="w-full max-w-md bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 text-red-700 animate-fade-in mb-8">
            <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Oops! Something went wrong.</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Results State */}
        {data && (
          <div className="w-full flex justify-center animate-fade-in-up">
            <StatsCard stats={data} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>Data provided by Wikimedia Pageviews API.</p>
      </footer>
    </div>
  );
};

export default App;