// Dati immagini/progetti — MODIFICA QUI titoli, descrizioni, anni e ordine.
// thumbs = versioni ridotte (griglia home + filmstrip /selected)
// full   = versioni piena risoluzione (immagine grande /selected + overlay progetto)

const names = [
  "photo01",
  "photo02",
  "photo03",
  "photo04",
  "photo05",
  "photo06",
  "photo07",
  "photo08",
  "photo09",
  "photo10",
  "photo11",
  "photo12",
  "photo13",
  "photo14",
  "photo15",
  "photo16",
  "photo17",
  "photo18",
  "photo19",
  "photo20",
];

// Prefisso per il deploy sotto sottocartella (es. GitHub Pages /2Dgallery);
// con immagini "unoptimized" Next non applica il basePath da solo ai src.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const thumb = (n) => `${BASE}/images/thumbs/${n}.jpg`;
const full = (n) => `${BASE}/images/full/${n}.jpg`;

// Griglia della home (thumbnail, stesso ordine del riferimento: un unico array)
export const overviewImages = names.map(thumb);

// Filmstrip di /selected (thumbnail) + immagini grandi corrispondenti (stesso ordine)
export const selectedThumbs = names.map(thumb);
export const selectedFull = names.map(full);

// Foto "biopic" della pagina About — cambiala con quella che preferisci
export const biopic = full("photo01");

// Progetti per l'overlay della home (click su una thumbnail).
// Raggruppati in serie da 5; testi placeholder da sostituire.
export const projects = [
  {
    title: "Progetto Uno",
    images: [full("photo01"), full("photo02"), full("photo03"), full("photo04"), full("photo05")],
    description:
      "Descrizione placeholder del progetto. Sostituisci questo testo in src/data/images.js con la storia di questa serie di scatti.",
    year: 2024,
  },
  {
    title: "Progetto Due",
    images: [full("photo06"), full("photo07"), full("photo08"), full("photo09"), full("photo10")],
    description:
      "Descrizione placeholder del progetto. Sostituisci questo testo in src/data/images.js con la storia di questa serie di scatti.",
    year: 2024,
  },
  {
    title: "Progetto Tre",
    images: [full("photo11"), full("photo12"), full("photo13"), full("photo14"), full("photo15")],
    description:
      "Descrizione placeholder del progetto. Sostituisci questo testo in src/data/images.js con la storia di questa serie di scatti.",
    year: 2025,
  },
  {
    title: "Progetto Quattro",
    images: [full("photo16"), full("photo17"), full("photo18"), full("photo19"), full("photo20")],
    description:
      "Descrizione placeholder del progetto. Sostituisci questo testo in src/data/images.js con la storia di questa serie di scatti.",
    year: 2025,
  },
];

// Trova il progetto a cui appartiene una thumbnail (stessa meccanica del riferimento:
// match sul nome file tra thumb cliccata e immagini del progetto)
export function findProjectByThumb(thumbSrc) {
  const base = thumbSrc.split("/").pop();
  return projects.find((p) => p.images.some((img) => img.split("/").pop() === base)) || null;
}

// Identità/contatti del sito — MODIFICA QUI
export const site = {
  title: "ANDREA",
  email: "lando.andrea04@gmail.com",
  instagram: "https://instagram.com/andrelndo",
  extraLabel: "+39(0)3337216052",
  extraUrl: "tel:+393337216052",
  creditsPrefix: "WEBSITE BY: ",
  creditsUrl: "https://github.com/Acci4i0",
};
