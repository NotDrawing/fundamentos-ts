import './styles/style.css'
import type { Gif } from './models/gif.interface';

const MEDIA_URL = 'https://media.giphy.com/media';

const gifs: Gif[] = [
    {
        id: 'cat-01',
        title: 'Gato programadno',
        description: 'Un gato que esta tecleando en una laptop',
        url: `${MEDIA_URL}/JIX9t2j0ZTN9S/giphy.gif`,
        username: 'gifinder',
        tags: ['gato', 'programación', 'computadora'],
        rating: 'g',
    },
    {
        id: 'celebration-01',
        title: 'Celebración del equipo',
        description: 'Leonardo di caprio levantando una copa',
        url: `${MEDIA_URL}/g9582DNuQppxC/giphy.gif`,
        tags: ['equipo', 'éxito', 'celebración'],
        rating: 'g',
    },
    {
        id: 'coding-01',
        title: 'Código en progreso',
        url: `${MEDIA_URL}/13HgwGsXF0aiGY/giphy.gif`,
        username: 'developer',
        tags: ['código', 'desarrollo', 'teclado'],
        rating: 'pg',
    },
    {
        id: 'idea-01',
        title: 'Nueva idea',
        url: `${MEDIA_URL}/l0HlRnAWXxn0MhKLK/giphy.gif`,
        tags: ['idea', 'creatividad', 'solución'],
        rating: 'g',
    },
    {
        id: 'dog-01',
        title: 'Perro feliz',
        description: 'Un perro moviendo la cola emocionado',
        url: `${MEDIA_URL}/hSL5u2QBjfgXuR99lE/giphy.gif`,
        username: 'petlover',
        tags: ['perro', 'alegría', 'mascota'],
        rating: 'g',
    },
    {
        id: 'travel-01',
        title: 'Viaje soñado',
        description: 'Torre eiffel',
        url: `${MEDIA_URL}/av1MVnL2LSDpm/giphy.gif`,
        tags: ['viaje', 'playa', 'atardecer'],
        rating: 'pg',
    },
];

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
    throw new Error('No se encontró el elemento #app.');
}
app.innerHTML = `
  <main class="app-shell">
    <header class="hero">
      <p class="eyebrow">EC1 - Fundamentos de TypeScript</p>
      <h1>GIFinder</h1>
      <p>Explora una colección local de GIFs.</p>
    </header>
    <form id="search-form" class="search-form">
      <label for="search-input">
        Buscar por título, autor o etiqueta
      </label>
      <div class="search-row">
        <input id="search-input" name="query"
          type="search" placeholder="Ejemplo: gato"
          autocomplete="off" />
        <button type="submit">Buscar</button>
      </div>
    </form>
    <p id="search-status" class="status"
      aria-live="polite"></p>
    <section id="gif-gallery" class="gallery"
      aria-label="Resultados"></section>
  </main>
`;

const form =
    document.querySelector<HTMLFormElement>('#search-form');
const input =
    document.querySelector<HTMLInputElement>('#search-input');
const gallery =
    document.querySelector<HTMLElement>('#gif-gallery');
const status =
    document.querySelector<HTMLParagraphElement>(
        '#search-status',
    );
if (!form || !input || !gallery || !status) {
    throw new Error(
        'No se pudo inicializar la interfaz de búsqueda.',
    );
}

function normalizeText(value: string): string {
    return value.trim().toLocaleLowerCase('es-MX');
}

function matchesQuery(gif: Gif, query: string): boolean {
    const searchableText = [
        gif.title,
        gif.description ?? '',
        gif.username ?? '',
        ...gif.tags,
    ].join(' ');
    return normalizeText(searchableText).includes(query);
}

function searchGifs(collection: Gif[], value: string): Gif[] {
    const query = normalizeText(value);
    if (!query) {
        return [...collection];
    }
    return collection.filter((gif) =>
        matchesQuery(gif, query),
    );
}

function createGifCard(gif: Gif): string {
    const {
        title,
        url,
        description = 'Sin descripción',
        username = 'Autor no disponible',
        tags,
        rating,
    } = gif;
    return `
    <article class="gif-card">
      <img src="${url}" alt="${title}"
        loading="lazy" />
      <div class="gif-card__content">
        <h2>${title}</h2>
        <p>Descripción: ${description}</p>
        <p>${username} - Clasificación
          ${rating.toUpperCase()}</p>
        <p class="tags">
          ${tags.map((tag) => `#${tag}`).join(' ')}
        </p>
      </div>
    </article>
  `;
}

function renderGifs(collection: Gif[]): void {
    if (!gallery || !status) {
        console.warn('Elementos DOM no disponibles para renderizar.');
        return;
    }

    const total = collection.length;
    const label = total === 1 ? 'resultado' : 'resultados';
    status.textContent = `${total} ${label}`;

    if (total === 0) {
        gallery.innerHTML = `
            <p class="empty-state">
                No se encontraron GIFs.
                Prueba con otra palabra.
            </p>
        `;
        return;
    }
    gallery.innerHTML = collection.map(createGifCard).join('');
}

form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    const results = searchGifs(gifs, input.value);
    renderGifs(results);
});
input.addEventListener('input', () => {
    if (input.value.trim() === '') {
        renderGifs(gifs);
    }
});

const firstSafeGif = gifs.find((gif) => gif.rating === 'g');
console.log(
    `Primer GIF clasificación G: ${firstSafeGif?.title ?? 'Ninguno'
    }`,
);
renderGifs(gifs);