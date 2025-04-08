export default function SocialSection() {
  return (
    <section id="social" className="py-16 bg-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#013196] text-center mb-12">SOCIĀLIE TĪKLI</h2>
        
        <div className="bg-white rounded-[30px] shadow-lg p-6">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-8">Sekojiet mums sociālajos tīklos, lai uzzinātu jaunāko informāciju par mūsu aktivitātēm!</p>
            <div className="mt-4 flex justify-center space-x-12">
              <a href="https://www.facebook.com/aleksandrsg" target="_blank" rel="noopener noreferrer" className="text-[#013196] hover:text-blue-700">
                <i className="fab fa-facebook-square text-5xl"></i>
                <p className="mt-2 font-medium">Facebook</p>
              </a>
              <a href="#" className="text-[#013196] hover:text-blue-700">
                <i className="fab fa-twitter-square text-5xl"></i>
                <p className="mt-2 font-medium">Twitter</p>
              </a>
              <a href="#" className="text-[#013196] hover:text-blue-700">
                <i className="fab fa-instagram-square text-5xl"></i>
                <p className="mt-2 font-medium">Instagram</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
