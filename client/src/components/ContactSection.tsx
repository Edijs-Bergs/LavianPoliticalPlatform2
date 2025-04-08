import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Set up animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(formRef.current!);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };
    
    try {
      await apiRequest('POST', '/api/contact', data);
      
      toast({
        title: "Ziņojums nosūtīts",
        description: "Paldies! Mēs ar jums sazināsimies, tiklīdz būs iespējams.",
      });
      
      // Reset form
      formRef.current?.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Kļūda",
        description: "Neizdevās nosūtīt ziņojumu. Lūdzu, mēģiniet vēlāk.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section 
      id="kontakti" 
      ref={sectionRef}
      className="py-16 bg-white opacity-0 transition-opacity duration-700"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#013196] text-center mb-12">SAZINIETIES AR MUMS</h2>
        
        <div className="bg-white rounded-[30px] shadow-lg p-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
                  Vārds
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#013196] focus:border-[#013196]"
                  placeholder="Jūsu vārds"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
                  E-pasts
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#013196] focus:border-[#013196]"
                  placeholder="Jūsu e-pasta adrese"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-1">
                Jūsu ziņojums
              </label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#013196] focus:border-[#013196] resize-none"
                placeholder="Jūsu ziņojums"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-[#013196] text-white font-bold py-3 px-8 rounded-[15px] hover:bg-blue-800 transition disabled:opacity-70"
              >
                {isSubmitting ? "Nosūta..." : "Nosūtīt ziņojumu"}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-[#013196] mb-4">Sociālie mediji</h3>
          <p className="text-[20px] mb-4">Sekojiet mums sociālajos tīklos, lai uzzinātu par jaunumiem:</p>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#013196] hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#013196] hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#013196] hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}