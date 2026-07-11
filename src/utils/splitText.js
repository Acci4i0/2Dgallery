// Spezza un testo in righe di ~maxChars caratteri (per parola intera),
// usato per animare la descrizione riga per riga come il riferimento.
export function splitTextIntoLines(text, maxChars = 45) {
  const words = text.split(" ");
  const lines = [];
  let current = [];
  let count = 0;
  words.forEach((word) => {
    const len = word.length + 1;
    if (count + len > maxChars && current.length > 0) {
      lines.push(current.join(" "));
      current = [];
      count = 0;
    }
    current.push(word);
    count += len;
  });
  if (current.length > 0) lines.push(current.join(" "));
  return lines;
}
