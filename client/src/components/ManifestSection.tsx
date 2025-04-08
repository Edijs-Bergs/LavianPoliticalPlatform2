export default function ManifestSection() {
  return (
    <section id="manifests" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#013196] text-center mb-12">MANIFESTS</h2>
        
        <div className="bg-[#013196] text-white p-8 md:p-12 rounded-[30px] shadow-lg mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Olaines novads – mūsdienīgs, attīstīts un ērts Tavai ģimenei.</h3>
          <p 
            className="text-lg leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ 
              __html: "Mēs esam komanda Tava Olaines novada attīstībai. Mēs veidosim spēcīgu, mūsdienīgu un vienotu Olaines novadu, kur Tu un Tava ģimene varēs justies droši, sadzirdēti, ērti, lai arī kurā novada daļā Tu atrastos.".replace(/\r?\n/g, '<br />') 
            }}
          ></p>
          <p 
            className="text-lg leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ 
              __html: "Tu varēsi turpināt lepoties ar savu novadu, un par to runās visā Latvijā kā par paraugu mūsdienīgai attīstībai. Mēs esam gatavi drosmīgiem lēmumiem, kas cels mūsu novada ģimeņu komforta līmeni ikdienas ritmā un vajadzībās.".replace(/\r?\n/g, '<br />') 
            }}
          ></p>
        </div>
        
        <div className="bg-white border-2 border-[#013196] p-8 md:p-12 rounded-[30px] shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#013196] text-center">OLAINES NOVADA CIEMI</h3>
          <p 
            className="text-lg leading-relaxed mb-6 text-gray-800" 
            dangerouslySetInnerHTML={{ 
              __html: "Visi Olaines novadā esošie ciemi (t.sk. DKS) piedzīvos pašvaldības attieksmes maiņu. Iedzīvotāju vēlmes tiks saklausītas un kļūs par vienu no novada attīstības prioritātēm: apgaismojums, ielu uzturēšana, veloceliņu izveide, kultūras vietas un aktīvās atpūtas zonas, adresācijas, novērošanas kameras.".replace(/\r?\n/g, '<br />')
            }}
          ></p>
          <p 
            className="text-lg leading-relaxed mb-6 text-gray-800"
            dangerouslySetInnerHTML={{ 
              __html: "Būs atbildīgie darbinieki par katru novada ciemu, lai nodrošinātu saziņu ar iedzīvotājiem un iedzīvotāju interešu aizstāvību. DKS un biedrības tiks atbalstītas ar caurskatāmu un saprotamu sistēmu. Pašvaldības budžeta projektā katru gadu ciemu attīstībai tiks novirzīti lielāki līdzekļi no kopējā budžeta, tādejādi mudinot deklarēties Olaines novadā.".replace(/\r?\n/g, '<br />')
            }}
          ></p>
          <div className="flex flex-col md:flex-row gap-8 mt-12">
            <div className="bg-[#013196] text-white p-6 rounded-[30px] flex-1 text-center">
              <p className="text-2xl font-bold">1 miljons €</p>
              <p 
                className="mt-2" 
                dangerouslySetInnerHTML={{ 
                  __html: "Četru gadu laikā sasniegsim investīciju apjomu Olaines novada ciemu infrastruktūrā kā līdzfinansējumu DKS un biedrībām".replace(/\r?\n/g, '<br />') 
                }}
              ></p>
            </div>
            <div className="bg-[#013196] text-white p-6 rounded-[30px] flex-1 text-center">
              <p className="text-2xl font-bold">10%</p>
              <p 
                className="mt-2" 
                dangerouslySetInnerHTML={{ 
                  __html: "Kopējais investīciju apjoms 4 gadu laikā ciemu infrastruktūrā sasniegs vismaz 10% no kopējā pašvaldības budžeta".replace(/\r?\n/g, '<br />') 
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
