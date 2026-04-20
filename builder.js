import fs from "fs";
import { articles } from "./data.js";
import { layout } from "./layout.js";
import { slugify, truncate, countWords, escapeHTML } from "./stringUtils.js";

const dist = "./dist";
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}

// --- Page STATISTIQUES ---
function generateStatsPage(data) {
  const nbrArticles = data.length;

  // Total de mots sur tout le blog
  const totalWords = data.reduce((sum, a) => sum + countWords(a.content), 0);

  // Moyenne de mots par article (arrondie)
  const avgWords = Math.round(totalWords / nbrArticles);

  // Auteur le plus actif : on compte les articles par auteur
  const authorCount = {};
  for (const a of data) {
    authorCount[a.author] = (authorCount[a.author] || 0) + 1;
  }
  const topAuthor = Object.keys(authorCount).reduce((best, author) =>
    authorCount[author] > authorCount[best] ? author : best,
  );

  const body = `
    <h1>Analyse du Blog</h1>
    <div class="stats-box">
      <div class="stat-item"><strong>${nbrArticles}</strong><br>Articles</div>
      <div class="stat-item"><strong>${totalWords}</strong><br>Mots au total</div>
      <div class="stat-item"><strong>${avgWords}</strong><br>Mots / article</div>
      <div class="stat-item"><strong>${topAuthor}</strong><br>Auteur principal</div>
    </div>
  `;
  return layout("Statistiques", body);
}

// --- Page ARCHIVES ---
function generateArchivesPage(data) {
  const list = data
    .map(
      (a) => `
    <li>
      <strong>${a.date}</strong> :
      <a href="${slugify(a.title)}.html">${escapeHTML(a.title)}</a>
      (${countWords(a.content)} mots)
    </li>
  `,
    )
    .join("");

  return layout("Archives", `<h1>Tous les articles</h1><ul>${list}</ul>`);
}

// --- Fonction principale build ---
export const build = () => {
  // Page Accueil
  const indexBody =
    `<h1>Dernières publications</h1>` +
    articles
      .map(
        (a) => `
    <div class="card">
      <h2>${escapeHTML(a.title)}</h2>
      <p>${truncate(a.content, 100)}</p>
      <a href="${slugify(a.title)}.html">Lire l'article</a>
    </div>
  `,
      )
      .join("");
  fs.writeFileSync(`${dist}/index.html`, layout("Accueil", indexBody));

  fs.writeFileSync(`${dist}/archives.html`, generateArchivesPage(articles));
  fs.writeFileSync(`${dist}/stats.html`, generateStatsPage(articles));
  fs.writeFileSync(
    `${dist}/a-propos.html`,
    layout(
      "À Propos",
      `
    <h1>À propos</h1>
    <p>Ce projet démontre un des potentiels utilisation de Node.js. Finalement, la limite restera toujours votre créativité et imagination. Cela dit, il faut Penser, Travailler et Impacter !</p>
  `,
    ),
  );

  // Pages articles individuelles
  articles.forEach((art) => {
    const content = `
      <img src="data:image/png;base64,${art.image}" style="width:100%; border-radius:8px;">
      <h1>${escapeHTML(art.title)}</h1>
      <p><em>Par ${art.author} le ${art.date}</em></p>
      <div style="background: white; padding: 20px; border-radius: 8px;">${art.content}</div>
    `;
    fs.writeFileSync(
      `${dist}/${slugify(art.title)}.html`,
      layout(art.title, content),
    );
  });

  console.log(
    "✨ Site web statique généré avec succès dans le répertoire /dist !",
  );
};
