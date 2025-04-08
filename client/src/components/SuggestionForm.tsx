import { useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { apiRequest } from '../lib/queryClient';

export default function SuggestionForm() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name || !email || !suggestion) {
      toast({
        title: "Kļūda!",
        description: "Lūdzu, aizpildiet visus laukus.",
        variant: "destructive"
      });
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      toast({
        title: "Kļūda!",
        description: "Lūdzu, ievadiet derīgu e-pasta adresi.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      await apiRequest(
        'POST',
        '/api/suggestions',
        {
          name,
          email,
          suggestion
        }
      );
      
      toast({
        title: "Paldies!",
        description: "Jūsu ieteikums ir veiksmīgi nosūtīts!",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSuggestion('');
    } catch (error) {
      toast({
        title: "Kļūda!",
        description: "Neizdevās nosūtīt ieteikumu. Lūdzu, mēģiniet vēlreiz.",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="suggestion-form" className="bg-white rounded-[30px] shadow-lg p-8 mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-[#013196] mb-6 text-center">
        Mūsu plāns ir dzīvs. Jūs varat piedalīties, dalot savu ideju vai ieteikumu Olainei. Mēs esam šeit, lai uzklausītu!
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
            Vārds
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#013196] focus:border-[#013196]"
            placeholder="Jūsu vārds"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
            E-pasts
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#013196] focus:border-[#013196]"
            placeholder="Jūsu e-pasta adrese"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="suggestion" className="block text-lg font-medium text-gray-700 mb-1">
            Jūsu ieteikums
          </label>
          <textarea
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#013196] focus:border-[#013196] resize-none"
            placeholder="Jūsu ieteikums vai ideja Olaines novada uzlabošanai"
            rows={6}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-[#013196] text-white font-bold py-3 px-8 rounded-[15px] hover:bg-blue-800 transition disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Nosūta...' : 'Iesniegt Ieteikumu'}
          </button>
        </div>
      </form>
    </div>
  );
}