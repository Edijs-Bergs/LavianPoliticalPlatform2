import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import type { Suggestion } from '../types/schema';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // The hardcoded demo credentials are only for demonstration purposes
  // In a real application, this should be secured properly
  const demoUser = 'admin';
  const demoPass = 'admin123';
  
  const { data: suggestions = [], isLoading, refetch } = useQuery<Suggestion[]>({
    queryKey: ['/api/suggestions'],
    enabled: isAuthenticated,
  });
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === demoUser && password === demoPass) {
      setIsAuthenticated(true);
    } else {
      alert('Nepareizs lietotājvārds vai parole!');
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-[30px] shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#013196] mb-6 text-center">Administratora panelis</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-1">
                Lietotājvārds
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#013196] focus:border-[#013196]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">
                Parole
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#013196] focus:border-[#013196]"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#013196] text-white font-bold py-3 px-8 rounded-[15px] hover:bg-blue-800 transition mt-4"
            >
              Pieslēgties
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#013196]">Iesniegtie ieteikumi</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Iziet
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-xl">Ielādē ieteikumus...</p>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="bg-white rounded-[30px] shadow-lg p-8 text-center">
            <p className="text-xl">Nav iesniegtie ieteikumi.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-[30px] shadow-lg p-6 transition hover:shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-[#013196] mb-1">{suggestion.name}</h2>
                    <p className="text-gray-600 mb-4">{suggestion.email}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(suggestion.createdAt).toLocaleDateString('lv-LV')}
                  </span>
                </div>
                <p className="text-lg whitespace-pre-wrap">{suggestion.suggestion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}