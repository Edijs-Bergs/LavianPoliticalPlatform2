import { queryClient, apiRequest } from './queryClient';
import { Candidate, ProgramSection, ProgramItem } from '@shared/schema';

// Default candidates data (used before API data loads)
export const defaultCandidates = [
  {
    id: 1,
    party: "Latvijas Attīstībai",
    region: "Olaines novada nākotnei",
    photo: "https://i.ibb.co/k5zCHKT/participant-card-example.png",
    name: "Ilze Lementujeva",
    title: "Aktīva Stūnīšu ciema iedzīvotāja",
    additionalTitle: "Latvijas Universitātes Muzeja krājuma glabātāja",
    about: "Es ticu, ka ciematu iedzīvotājiem ir jādod balss ne tikai, lai viņi protestētu pret jau pieņemtiem lēmumiem, bet lai pašvaldība uzklausītu viņu viedokli vēl pirms lēmumi tiek pieņemti. Manuprāt, novada domes darbā lielākajām rūpēm jābūt saistītām ar iedzīvotājiem nepieciešamo.",
    orderNumber: 1
  },
  {
    id: 2,
    party: "Latvijas Attīstībai",
    region: "Olaines novada nākotnei",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Jānis Bērziņš",
    title: "Uzņēmējs",
    additionalTitle: "Olaines novada iedzīvotājs",
    about: "Mana pieredze uzņēmējdarbībā ir devusi man izpratni par to, kā efektīvi pārvaldīt resursus un veidot ilgtspējīgu attīstību. Es vēlos šīs zināšanas izmantot Olaines novada labā, lai veicinātu uzņēmējdarbības vidi un radītu jaunas darbavietas vietējiem iedzīvotājiem.",
    orderNumber: 2
  },
  {
    id: 3,
    party: "Latvijas Attīstībai",
    region: "Olaines novada nākotnei",
    photo: "https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Anna Kalniņa",
    title: "Izglītības speciāliste",
    additionalTitle: "Olaines 1. vidusskolas skolotāja",
    about: "Mana prioritāte ir kvalitatīva izglītība katram Olaines novada bērnam. Vēlos panākt, ka novada izglītības iestādes kļūst par vietām, kur tiek attīstīti talanti un veidota nākotnes paaudze, kas būs gatava pieņemt mūsdienu izaicinājumus.",
    orderNumber: 3
  }
];

// Default program sections data (used before API data loads)
export const defaultProgramSections = [
  {
    id: 1,
    title: "IEKŠĒJĀ DROŠĪBA",
    icon: "fas fa-shield-alt",
    goal: "Katrs iedzīvotājs jūtas droši, lai arī kurā novada daļā atrastos.",
    items: [
      "Palielināsim pašvaldības policijas resursus.",
      "Iesaistīsim pašvaldības policiju ātruma kontrolē.",
      "Uzstādīsim papildu novērošanas kameras."
    ]
  },
  {
    id: 2,
    title: "CIVILĀ AIZSARDZĪBA",
    icon: "fas fa-hard-hat",
    goal: "Olaines novads – gatavs krīzes situācijai.",
    items: [
      "Pilnveidosim civilās aizsardzības plānu, lai ikviens zinātu, kā rīkoties krīzes situācijā.",
      "Organizēsim izglītības programmas skolēniem un pieaugušajiem par krīzes situāciju risināšanu."
    ]
  },
  {
    id: 3,
    title: "SOCIĀLIE PAKALPOJUMI",
    icon: "fas fa-hands-helping",
    goal: "Klienta vajadzību izpratne.",
    items: [
      "Uzlabosim Olaines sociālā dienesta darbinieku komunikāciju un sadarbību ar klientiem un izglītības iestādēm.",
      "Stiprināsim sociālos pakalpojumus mazāk aizsargātajām sabiedrības grupām.",
      "Atbalstīsim audžuģimenes, pastiprināti strādāsim ar bāreņiem un nelabvēlīgām ģimenēm."
    ]
  },
  {
    id: 4,
    title: "IZGLĪTĪBA un INTEREŠU IZGLĪTĪBA",
    icon: "fas fa-book",
    goal: "Konkurētspējīga un iekļaujoša izglītība.",
    items: [
      "Pārskatīsim Olaines novada skolu tīkla reformu.",
      "Tieksimies uz ģimnāzijas izveidi.",
      "Ieviesīsim sistēmu, kas atbalsta STEM.",
      "Ieviesīsim iekļaujošo izglītību.",
      "Pilnveidosim skolēnu autobusu maršrutu grafikus.",
      "Organizēsim interešu izglītības dienas.",
      "Uzlabosim pedagogu piesaistes un motivācijas sistēmu."
    ]
  },
  {
    id: 5,
    title: "KULTŪRA UN SPORTS",
    icon: "fas fa-running",
    goal: "Sabiedrības aktīva iesaiste.",
    items: [
      "Piesaistīsim privātos investorus, lai izbūvētu slēgta tipa multifunkcionālo sporta halli (kupolu).",
      "Veicināsim kultūras pasākumu pieejamību arī novada ciemos.",
      "Atgriezīsim Olainē basketbolu.",
      "Ieviesīsim \"Olaines Gada laureāts sportā\"."
    ]
  },
  {
    id: 6,
    title: "JAUNIEŠI",
    icon: "fas fa-users",
    goal: "Vienlīdzīgas iespējas jauniešiem visā novadā.",
    items: [
      "Palielināsim jauniešu aktivitāšu iespējas novada ciemos.",
      "Turpināsim atbalstīt un stiprināsim OJC \"Popkorna\" darbību."
    ]
  },
  {
    id: 7,
    title: "VIDES ILGTSPĒJA UN KOMUNĀLIE PAKALPOJUMI",
    icon: "fas fa-tree",
    goal: "Zaļš un ilgtspējīgs novads.",
    items: [
      "Sadarbībā ar OŪS būtiski palielināsim atjaunojamo energoresursu izmantošanu komunālajā saimniecībā, samazinot ietekmi uz vidi.",
      "Kopā ar OŪS ieviesīsim bioloģisko un dārza atkritumu nodošanas punktus."
    ]
  },
  {
    id: 8,
    title: "INFRASTRUKTŪRA UN VIDE",
    icon: "fas fa-road",
    goal: "Sakārtota un droša vide.",
    items: [
      "Lētāk un ātrāk realizēsim Mūzikas un mākslas skolas ēkas būvniecības projektu.",
      "Zeiferta nams pārtaps par jaunrades un kopienu centru.",
      "Uzlabosim sabiedriskā transporta savienojumus starp ciemiem un pilsētu.",
      "Uzlabosim Olaines pilsētas satiksmes drošību un ielu kvalitāti.",
      "Sakārtosim visu daudzdzīvokļu māju iekšpagalmus un apgaismojumu.",
      "Veiksim graustu auditu novadā.",
      "Izstrādāsim Olaines kanāla attīstības projektu.",
      "Atjaunosim Olaines centrālo laukumu ar pulksteni.",
      "Izbūvēsim gājēju/veloceļu posmā Olaine-Pēternieki."
    ]
  },
  {
    id: 9,
    title: "BIZNESS",
    icon: "fas fa-chart-line",
    goal: "Labākā vieta uzņēmējdarbībai Latvijā.",
    items: [
      "Izveidosim lielo uzņēmumu/investoru piesaistes programmu. Piesaistīsim vietējās un starptautiskās investīcijas.",
      "Atbalstīsim novada mazos uzņēmējus."
    ]
  }
];

// API functions for fetching data
export async function fetchCandidates(): Promise<Candidate[]> {
  try {
    const response = await apiRequest('GET', '/api/candidates');
    const candidates = await response.json();
    return (candidates && candidates.length > 0) ? candidates : defaultCandidates;
  } catch (error) {
    console.error('Error fetching candidates from API:', error);
    return defaultCandidates;
  }
}

export async function fetchProgramSections(): Promise<ProgramSection[]> {
  try {
    const response = await apiRequest('GET', '/api/program-sections');
    const sections = await response.json();
    return (sections && sections.length > 0) ? sections : defaultProgramSections;
  } catch (error) {
    console.error('Error fetching program sections from API:', error);
    return defaultProgramSections;
  }
}

export async function fetchProgramItems(sectionId: number): Promise<ProgramItem[]> {
  try {
    const response = await apiRequest('GET', `/api/program-sections/${sectionId}/items`);
    const items = await response.json();
    return items || [];
  } catch (error) {
    console.error(`Error fetching program items for section ${sectionId}:`, error);
    // Return default items for this section from the defaultProgramSections
    const section = defaultProgramSections.find(s => s.id === sectionId);
    if (section && section.items) {
      return section.items.map((content, index) => ({
        id: index + 1,
        sectionId,
        content
      }));
    }
    return [];
  }
}

// Helper function to build complete program sections with items
export async function fetchCompleteProgramSections() {
  try {
    // First try to fetch from the complete endpoint
    const response = await apiRequest('GET', '/api/program-sections/complete');
    const completeSections = await response.json();
    
    if (completeSections && completeSections.length > 0) {
      return completeSections;
    }
    
    // Fallback to building them manually if the complete endpoint fails
    const sections = await fetchProgramSections();
    
    // Fetch items for each section and create the complete structure
    const sectionsWithItems = await Promise.all(
      sections.map(async (section) => {
        const items = await fetchProgramItems(section.id);
        return {
          ...section,
          items: items.map(item => item.content)
        };
      })
    );
    
    return sectionsWithItems.length > 0 ? sectionsWithItems : defaultProgramSections;
  } catch (error) {
    console.error('Error building complete program sections:', error);
    return defaultProgramSections;
  }
}

// For backward compatibility, export the default data directly
// so existing components don't break
export const candidates = defaultCandidates;
export const programSections = defaultProgramSections;