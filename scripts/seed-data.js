import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Configure neon client
neonConfig.webSocketConstructor = ws;

// Initial candidate data
const candidates = [
  {
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

// Initial program sections data
const programSections = [
  {
    title: "IEKŠĒJĀ DROŠĪBA",
    icon: "fas fa-shield-alt",
    goal: "Katrs iedzīvotājs jūtas droši, lai arī kurā novada daļā atrastos."
  },
  {
    title: "CIVILĀ AIZSARDZĪBA",
    icon: "fas fa-hard-hat",
    goal: "Olaines novads – gatavs krīzes situācijai."
  },
  {
    title: "SOCIĀLIE PAKALPOJUMI",
    icon: "fas fa-hands-helping",
    goal: "Klienta vajadzību izpratne."
  },
  {
    title: "IZGLĪTĪBA un INTEREŠU IZGLĪTĪBA",
    icon: "fas fa-book",
    goal: "Konkurētspējīga un iekļaujoša izglītība."
  },
  {
    title: "KULTŪRA UN SPORTS",
    icon: "fas fa-running",
    goal: "Sabiedrības aktīva iesaiste."
  },
  {
    title: "JAUNIEŠI",
    icon: "fas fa-users",
    goal: "Vienlīdzīgas iespējas jauniešiem visā novadā."
  },
  {
    title: "VIDES ILGTSPĒJA UN KOMUNĀLIE PAKALPOJUMI",
    icon: "fas fa-tree",
    goal: "Zaļš un ilgtspējīgs novads."
  },
  {
    title: "INFRASTRUKTŪRA UN VIDE",
    icon: "fas fa-road",
    goal: "Sakārtota un droša vide."
  },
  {
    title: "BIZNESS",
    icon: "fas fa-chart-line",
    goal: "Labākā vieta uzņēmējdarbībai Latvijā."
  }
];

// Program items mapped to their sections
const programItems = [
  // Section 1: IEKŠĒJĀ DROŠĪBA
  {
    sectionId: 1,
    content: "Palielināsim pašvaldības policijas resursus."
  },
  {
    sectionId: 1,
    content: "Iesaistīsim pašvaldības policiju ātruma kontrolē."
  },
  {
    sectionId: 1,
    content: "Uzstādīsim papildu novērošanas kameras."
  },
  
  // Section 2: CIVILĀ AIZSARDZĪBA
  {
    sectionId: 2,
    content: "Pilnveidosim civilās aizsardzības plānu, lai ikviens zinātu, kā rīkoties krīzes situācijā."
  },
  {
    sectionId: 2,
    content: "Organizēsim izglītības programmas skolēniem un pieaugušajiem par krīzes situāciju risināšanu."
  },
  
  // Section 3: SOCIĀLIE PAKALPOJUMI
  {
    sectionId: 3,
    content: "Uzlabosim Olaines sociālā dienesta darbinieku komunikāciju un sadarbību ar klientiem un izglītības iestādēm."
  },
  {
    sectionId: 3,
    content: "Stiprināsim sociālos pakalpojumus mazāk aizsargātajām sabiedrības grupām."
  },
  {
    sectionId: 3,
    content: "Atbalstīsim audžuģimenes, pastiprināti strādāsim ar bāreņiem un nelabvēlīgām ģimenēm."
  },
  
  // Section 4: IZGLĪTĪBA un INTEREŠU IZGLĪTĪBA
  {
    sectionId: 4,
    content: "Pārskatīsim Olaines novada skolu tīkla reformu."
  },
  {
    sectionId: 4,
    content: "Tieksimies uz ģimnāzijas izveidi."
  },
  {
    sectionId: 4,
    content: "Ieviesīsim sistēmu, kas atbalsta STEM."
  },
  {
    sectionId: 4,
    content: "Ieviesīsim iekļaujošo izglītību."
  },
  {
    sectionId: 4,
    content: "Pilnveidosim skolēnu autobusu maršrutu grafikus."
  },
  {
    sectionId: 4,
    content: "Organizēsim interešu izglītības dienas."
  },
  {
    sectionId: 4,
    content: "Uzlabosim pedagogu piesaistes un motivācijas sistēmu."
  },
  
  // Section 5: KULTŪRA UN SPORTS
  {
    sectionId: 5,
    content: "Piesaistīsim privātos investorus, lai izbūvētu slēgta tipa multifunkcionālo sporta halli (kupolu)."
  },
  {
    sectionId: 5,
    content: "Veicināsim kultūras pasākumu pieejamību arī novada ciemos."
  },
  {
    sectionId: 5,
    content: "Atgriezīsim Olainē basketbolu."
  },
  {
    sectionId: 5,
    content: "Ieviesīsim \"Olaines Gada laureāts sportā\"."
  },
  
  // Section 6: JAUNIEŠI
  {
    sectionId: 6,
    content: "Palielināsim jauniešu aktivitāšu iespējas novada ciemos."
  },
  {
    sectionId: 6,
    content: "Turpināsim atbalstīt un stiprināsim OJC \"Popkorna\" darbību."
  },
  
  // Section 7: VIDES ILGTSPĒJA UN KOMUNĀLIE PAKALPOJUMI
  {
    sectionId: 7,
    content: "Sadarbībā ar OŪS būtiski palielināsim atjaunojamo energoresursu izmantošanu komunālajā saimniecībā, samazinot ietekmi uz vidi."
  },
  {
    sectionId: 7,
    content: "Kopā ar OŪS ieviesīsim bioloģisko un dārza atkritumu nodošanas punktus."
  },
  
  // Section 8: INFRASTRUKTŪRA UN VIDE
  {
    sectionId: 8,
    content: "Lētāk un ātrāk realizēsim Mūzikas un mākslas skolas ēkas būvniecības projektu."
  },
  {
    sectionId: 8,
    content: "Zeiferta nams pārtaps par jaunrades un kopienu centru."
  },
  {
    sectionId: 8,
    content: "Uzlabosim sabiedriskā transporta savienojumus starp ciemiem un pilsētu."
  },
  {
    sectionId: 8,
    content: "Uzlabosim Olaines pilsētas satiksmes drošību un ielu kvalitāti."
  },
  {
    sectionId: 8,
    content: "Sakārtosim visu daudzdzīvokļu māju iekšpagalmus un apgaismojumu."
  },
  {
    sectionId: 8,
    content: "Veiksim graustu auditu novadā."
  },
  {
    sectionId: 8,
    content: "Izstrādāsim Olaines kanāla attīstības projektu."
  },
  {
    sectionId: 8,
    content: "Atjaunosim Olaines centrālo laukumu ar pulksteni."
  },
  {
    sectionId: 8,
    content: "Izbūvēsim gājēju/veloceļu posmā Olaine-Pēternieki."
  },
  
  // Section 9: BIZNESS
  {
    sectionId: 9,
    content: "Izveidosim lielo uzņēmumu/investoru piesaistes programmu. Piesaistīsim vietējās un starptautiskās investīcijas."
  },
  {
    sectionId: 9,
    content: "Atbalstīsim novada mazos uzņēmējus."
  }
];

async function seedDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log("Connected to the database");

    // Clear existing data
    await pool.query('DELETE FROM "programItems"');
    await pool.query('DELETE FROM "programSections"');
    await pool.query('DELETE FROM "candidates"');
    
    console.log("Cleared existing data");

    // Insert candidates
    for (const candidate of candidates) {
      const result = await pool.query(
        `INSERT INTO candidates (party, region, photo, name, title, "additionalTitle", about, "orderNumber")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [
          candidate.party,
          candidate.region,
          candidate.photo,
          candidate.name,
          candidate.title,
          candidate.additionalTitle,
          candidate.about,
          candidate.orderNumber
        ]
      );
      console.log(`Inserted candidate with ID: ${result.rows[0].id}`);
    }

    // Insert program sections
    for (let i = 0; i < programSections.length; i++) {
      const section = programSections[i];
      const result = await pool.query(
        `INSERT INTO "programSections" (title, icon, goal)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [section.title, section.icon, section.goal]
      );
      console.log(`Inserted program section with ID: ${result.rows[0].id}`);
    }

    // Insert program items
    for (const item of programItems) {
      const result = await pool.query(
        `INSERT INTO "programItems" ("sectionId", content)
         VALUES ($1, $2)
         RETURNING id`,
        [item.sectionId, item.content]
      );
      console.log(`Inserted program item with ID: ${result.rows[0].id}`);
    }

    console.log("Database seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await pool.end();
  }
}

seedDatabase();