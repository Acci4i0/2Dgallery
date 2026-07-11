# 2Dgallery — rebuild study

Portfolio fotografico con animazioni: preloader con contatore, transizioni di
pagina a "tenda", griglia con overlay progetto fullscreen, filmstrip
orizzontale con scrubbing e cursore custom.

Le dinamiche di interazione sono ricostruite studiando il comportamento del
sito di Meklit Fekadu (design originale di Malik Kotb); contenuti e immagini
sono propri.

## Stack

- [Next.js](https://nextjs.org/) (Pages Router) + React
- [GSAP](https://gsap.com/) + `@gsap/react` — timeline di ingresso
- [Framer Motion](https://www.framer.com/motion/) — transizioni di pagina e cursore
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- [Tailwind CSS](https://tailwindcss.com/)

## Sviluppo

```bash
npm install
npm run dev        # http://localhost:3000
```

Build di produzione (export statico in `out/`):

```bash
npm run build
npx serve out   # anteprima locale della build
```

## Struttura

```
src/
  pages/index.js               home: preloader + griglia + overlay progetto
  pages/selected.js            immagine grande + filmstrip scrubber
  pages/about.js               bio, clienti, footer
  components/Header.js         header di navigazione comune
  components/Layout.js         transizioni di pagina (AnimatePresence)
  components/Cursor.js         cursore custom (spring)
  components/ProjectDetails.js overlay progetto fullscreen
  hooks/useRefCollector.js     raccolta nodi per le timeline GSAP
  data/images.js               immagini, progetti, contatti
public/images/full|thumbs      foto piena risoluzione / thumbnail
```

## Personalizzazione

- **Progetti, titoli, contatti**: `src/data/images.js`
- **Bio e clienti**: `src/pages/about.js`
- **Foto**: sostituisci i file in `public/images/full` e rigenera le thumbnail, es. su macOS:

  ```bash
  sips -Z 640 public/images/full/*.jpg --out public/images/thumbs
  ```

## Deploy

Ogni push su `main` esegue il workflow [deploy.yml](.github/workflows/deploy.yml)
che esporta il sito statico (con `basePath /2Dgallery`) e lo pubblica su
GitHub Pages: https://acci4i0.github.io/2Dgallery/

## Disclaimer

Questo è uno **studio didattico di ricostruzione** delle sole dinamiche di
interazione, non affiliato agli autori del sito di riferimento. Nessun asset
originale è incluso: fotografie e contenuti sono personali.

## Licenza

[MIT](LICENSE) © ANDREA ([Acci4i0](https://github.com/Acci4i0))
