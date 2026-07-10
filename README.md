# 2Dgallery

Portfolio fotografico single-page con animazioni: preloader con contatore, transizioni di pagina a "tenda", griglia con overlay progetto fullscreen, filmstrip orizzontale con scrubbing e cursore custom.

Le dinamiche di interazione sono ricostruite studiando il comportamento del sito di Meklit Fekadu (design originale di Malik Kotb); contenuti e immagini sono propri.

## Stack

- [Next.js](https://nextjs.org/) (Pages Router) + React
- [GSAP](https://gsap.com/) + `@gsap/react` — timeline di ingresso
- [Framer Motion](https://www.framer.com/motion/) — transizioni di pagina e cursore
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- [Tailwind CSS](https://tailwindcss.com/)

## Avvio

```bash
npm install
npm run dev        # http://localhost:3000
```

Build di produzione:

```bash
npm run build
npm start
```

## Struttura

```
pages/index.js               # home: preloader + griglia + overlay progetto
pages/selected.js            # immagine grande + filmstrip scrubber
pages/about.js               # bio, clienti, footer
components/Layout.js         # transizioni di pagina (AnimatePresence)
components/Cursor.js         # cursore custom (spring)
components/ProjectDetails.js # overlay progetto fullscreen
data/images.js               # immagini, progetti, contatti
public/images/full|thumbs    # foto piena risoluzione / thumbnail
```

## Personalizzazione

- **Progetti, titoli, contatti**: `data/images.js`
- **Bio e clienti**: `pages/about.js`
- **Foto**: sostituisci i file in `public/images/full` e rigenera le thumbnail, es. su macOS:

  ```bash
  sips -Z 640 public/images/full/*.jpg --out public/images/thumbs
  ```
