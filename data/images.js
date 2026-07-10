// Dati immagini/progetti — MODIFICA QUI titoli, descrizioni, anni e ordine.
// thumbs = versioni ridotte (griglia home + filmstrip /selected)
// full   = versioni piena risoluzione (immagine grande /selected + overlay progetto)

const names = [
  "0EBC9ADE-829B-45A5-B6D4-0A0B956C762E",
  "8BA3D10D-BCD7-471F-8506-1AC24CEB58C6",
  "IMG_0117",
  "IMG_0118",
  "IMG_0119",
  "IMG_0120",
  "IMG_0121",
  "IMG_0122",
  "IMG_0153",
  "IMG_0154",
  "IMG_0155",
  "IMG_0156",
  "IMG_0157",
  "IMG_0387",
  "IMG_0388",
  "IMG_0390",
  "IMG_0391",
  "IMG_0392",
  "IMG_0393",
  "IMG_0394",
  "IMG_0396",
];

const thumb = (n) => `/images/thumbs/${n}.jpg`;
const full = (n) => `/images/full/${n}.jpg`;

// Griglia della home (thumbnail, stesso ordine del riferimento: un unico array)
export const overviewImages = names.map(thumb);

// Filmstrip di /selected (thumbnail) + immagini grandi corrispondenti (stesso ordine)
export const selectedThumbs = names.map(thumb);
export const selectedFull = names.map(full);

// Foto "biopic" della pagina About — cambiala con quella che preferisci
export const biopic = full("IMG_0117");

// Progetti per l'overlay della home (click su una thumbnail).
// Raggruppati per batch di scatto; testi placeholder da sostituire.
export const projects = [
  {
    title: "Progetto Uno",
    images: [full("0EBC9ADE-829B-45A5-B6D4-0A0B956C762E"), full("8BA3D10D-BCD7-471F-8506-1AC24CEB58C6")],
    description:
      "Descrizione placeholder del progetto. Sostituisci questo testo in data/images.js con la storia di questa serie di scatti.",
    year: 2024,
  },
  {
    title: "Progetto Due",
    images: [full("IMG_0117"), full("IMG_0118"), full("IMG_0119"), full("IMG_0120"), full("IMG_0121"), full("IMG_0122")],
    description:
      "Descrizione placeholder del progetto. Sostituisci questo testo in data/images.js con la storia di questa serie di scatti.",
    year: 2024,
  },
  {
    title: "Progetto Tre",
    images: [full("IMG_0153"), full("IMG_0154"), full("IMG_0155"), full("IMG_0156"), full("IMG_0157")],
    description:
      "Descrizione placeholder del progetto. Sostituisci questo testo in data/images.js con la storia di questa serie di scatti.",
    year: 2025,
  },
  {
    title: "Progetto Quattro",
    images: [
      full("IMG_0387"),
      full("IMG_0388"),
      full("IMG_0390"),
      full("IMG_0391"),
      full("IMG_0392"),
      full("IMG_0393"),
      full("IMG_0394"),
      full("IMG_0396"),
    ],
    description:
      "Descrizione placeholder del progetto. Sostituisci questo testo in data/images.js con la storia di questa serie di scatti.",
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
  title: "SABRINA LAGO",
  email: "info@example.com",
  instagram: "https://www.instagram.com/",
  extraLabel: "Vogue",
  extraUrl: "#",
  credits: "WEBSITE BY: SABRINA",
  creditsUrl: "#",
};
